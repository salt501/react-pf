import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './reset.css';
import './common.css';
import './index.css';
import './searched.css';
import { ScrollToTopOnMount } from './App';

export default class SearchedPage extends React.Component{
  constructor(props) {
    super(props);
    
    let searchedItem = [
      { 画像URL: "", 名前: "", ブランド: "", 色タイトル: "", サブタイトル: "", 価格: "", ジャンル: "", 色: "", URL: "" }];
    
    this.state = { searchedItem: searchedItem};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './output.json');
    xhr.onreadystatechange =
      () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json_data = JSON.parse(xhr.responseText);

          const urlParams = new URL(window.location.href);
          const prm = new URLSearchParams(urlParams.search);
          let price = prm.get('価格');
          
          
          // searchedItemの新しい配列を作成する
          searchedItem = json_data.filter(
            function (obj) {
              return obj['ブランド'] === prm.get('ブランド');
            }
          ).filter(
            function (obj) {
              return obj['ジャンル'] === prm.get('ジャンル');
            }
          ).filter(
            function (obj) {
              return obj['色'] === prm.get('色');
            }
          ).filter(
            function (obj) {
              return obj['価格'] === Number(price);
            }
          )
          this.setState({searchedItem:searchedItem});

        };
      }
    xhr.send();
  }

  render() {
    return (
      <div>
        <header>
          <div className="header-all">
            <nav>
              <ul className="header-list">
                <li><a href="/#search">検索</a></li>
                <li><a href="/#new">新作情報</a></li>
                <li><a href="/#ranking">ランキング</a></li>
                <li><a href="/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section className="searched" id="searched">
            <ScrollToTopOnMount />
            <div className="searched-all">
              <div className="result-title">
                <h2 className="font2">検索結果</h2>
                <h3 className="font3">◯件</h3>
              </div>

              <div className="searched-list">
                <div className="searched-item">
                  <p>ブランド：</p>
                  <p>カテゴリー：</p>
                  <p>カラー：</p>
                  <p>価格：¥</p>
                </div>
              </div>
            </div>
          </section>

          <section className="result">
            {this.state.searchedItem.map(
              (s) => <SearchedItem 画像URL={s['画像URL']} 名前={s['名前']} ブランド={s['ブランド']} 色タイトル={s['色タイトル']} サブタイトル={s['サブタイトル']} 価格={s['価格']} ジャンル={s['ジャンル']} 色={s['色']} URL={s['URL']}/>
            )}
          </section>
        </main>
      </div>
    )
  }
}

class SearchedItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="result-all">
        
        <div className="result-img">
          <img src={ this.props['画像URL'] } alt="検索画像" />
        </div>
        <div className="result-container">
          <h3 className="font3">{ this.props['名前'] }</h3>
          <div className="result-txt">
            <h4 className="font4">{ this.props['ブランド'] }</h4>
            <div className="txt-inner">
              <p className="colorttl">{ this.props['色タイトル'] }</p>
              <p className="colorSttl">{ this.props['サブタイトル'] }</p>
            </div>
            <div className="result-detail">
              <p className="result-price">¥{ this.props['価格'] }</p>
              <p>カテゴリー：{ this.props['ジャンル'] }</p>
              <p>カラー：{ this.props['色'] }</p>
            </div>
          </div>
        </div>
        <div className="result-btn">
          <button>いいね</button>
          <a className="btn-link" href={this.props['URL']}>公式サイトへ</a>
        </div>
      </div> 
    )
  }
}


ReactDOM.render(
  SearchedPage, document.getElementById('root')
);
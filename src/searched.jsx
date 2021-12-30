import React from 'react'
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
      { 画像URL: "", 名前: "", ブランド: "", 番号:"", 色タイトル: "", サブタイトル: "", 価格: "", ジャンル: "", 色: "", URL: "" }];
    let params = { ブランド: "", ジャンル: "", 色: "", 価格: ""};
    this.state = { searchedItem: searchedItem, params: params};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './output.json');
    xhr.onreadystatechange =
      () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json_data = JSON.parse(xhr.responseText);

          // クエリ文字列の読み込み
          const urlParams = new URL(window.location.href);
          const prm = new URLSearchParams(urlParams.search);
          let hprice = prm.get('上限価格');
          let lprice = prm.get('下限価格');
          
          params = { ブランド: prm.get('ブランド'), ジャンル: prm.get('ジャンル'), 色: prm.get('色'), 価格: prm.get('下限価格') + "~" + prm.get('上限価格') };

          // searchedItemの新しい配列を作成する
          searchedItem = json_data.filter(
            function (obj) {
              return (!prm.get('ブランド') || obj['ブランド'] === prm.get('ブランド'))
                && (!prm.get('ジャンル') || obj['ジャンル'] === prm.get('ジャンル'))
                && (!prm.get('色') || obj['色'] == prm.get('色'))
                && (!Number(hprice) || obj['価格'] <= Number(hprice))
                && (!Number(lprice) || obj['価格'] >= Number(lprice));
            }
          )
          
          this.setState({ searchedItem: searchedItem, params: params });

          console.log(params['ブランド'])
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
                <li><a href="/#roughly-search">ざっくり検索</a></li>
                <li><a href="/#new">新作情報</a></li>
                <li><a href="/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section className="searched" id="searched">
            <div className="inner">
              <ScrollToTopOnMount />
              <div className="searched-all">
                <div className="result-title">
                  <h2 className="font2">検索結果</h2>
                  <h3 className="font3">{ this.state.searchedItem.length }件</h3>
                </div>

                <div className="searched-list">
                  <div className="searched-item">
                    <table>
                      <tr>
                        <td className="left">ブランド：</td>
                        <td>{ this.state.params['ブランド']}</td>
                      </tr>
                      <tr>
                        <td className="left">カテゴリー：</td>
                        <td>{ this.state.params['ジャンル']}</td>
                      </tr>
                      <tr>
                        <td className="left">カラー：</td>
                        <td>{ this.state.params['色']}</td>
                      </tr>
                      <tr>
                        <td className="left">価格：</td>
                        <td>¥{ this.state.params['価格']}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="result">
            <div className="inner">
              {this.state.searchedItem.map(
                (s) => <SearchedItem 画像URL={s['画像URL']} 名前={s['名前']} ブランド={s['ブランド']} 番号={s['番号']} 色タイトル={s['色タイトル']} サブタイトル={s['サブタイトル']} 価格={s['価格']} ジャンル={s['ジャンル']} 色={s['色']} URL={s['URL']} />
              )}
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-inner">
            <div className="contact">
              <h5>contact</h5>
              <a href="https://twitter.com/5k_o4">
                <div className="contact-img">
                  <img src="./twitter-logo.png" alt="twitterロゴ" />
                </div>
              </a>
              <p>ご要望やお問い合わせに関しては、<br />制作主のtwitterのDMにて受け付けております。</p>
            </div>
            <p className="copyright">©︎ 2021 Shiori Inc.</p>
          </div>
        </footer>
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
          <h4 className="font4">{ this.props['名前'] }</h4>
          <div className="result-txt">
            <h5 className="font5">{ this.props['ブランド'] }</h5>
            <div className="txt-inner">
              <p className="colorttl">{ this.props['番号']} { this.props['色タイトル'] }</p>
              <p className="colorSttl">{ this.props['サブタイトル'] }</p>
            </div>
            <div className="result-detail">
              <p className="result-price">¥{ this.props['価格'] }（税込）</p>
              <p>カテゴリー：{ this.props['ジャンル'] }</p>
              <p>カラー：{ this.props['色'] }</p>
            </div>
          </div>
        </div>
        <div className="result-btn">
          <a className="btn-link" href={this.props['URL']}>公式サイトへ</a>
        </div>
      </div> 
    )
  }
}


ReactDOM.render(
  SearchedPage, document.getElementById('root')
);
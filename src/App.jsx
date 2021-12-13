import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import './common.css';
import { render } from '@testing-library/react';


class Page extends React.Component{
  constructor(props) {
    super(props);
    const news = [
      { date: "2021/01/01", text: "新しい情報を追加しました" },
      { date: "2021/01/01", text: "新しい情報を追加しました" },
      { date: "2021/01/01", text: "新しい情報を追加しました" }];
    const newItem = [
      { img: "", title: "Dior新作" },
      { img: "", title: "CHANEL新作" },
      { img: "", title: "Diorクリスマスコフレ" }
    ];
    const likedItem = [
      { img: "", bland: "ブランド", ttl: "タイトル", colorttl: "カラータイトル", colorSttl: "カラー" },
      { img: "", bland: "ブランド", ttl: "タイトル", colorttl: "カラータイトル", colorSttl: "カラー" },
      { img: "", bland: "ブランド", ttl: "タイトル", colorttl: "カラータイトル", colorSttl: "カラー" }
    ];
    this.state =
      { news: news, newItem: newItem, likedItem: likedItem };
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://docs.google.com/spreadsheets/d/1YXOZke83S2czRgUZ-BsvFe6_EgrXT4po9GAuk7L4WS0/edit?usp=sharing', true);
    xhr.send(null);
    
    xhr.onreadystatechange =
      function () {
        let result = [];
        let tmp = xhr.responseText.split('\n');
        if (xhr.readyState === 4 && xhr.status === 200) {
          for (var i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
          }
        }
        return console.log(result);
      }
    
  }

  render() {
    return (
      <div>
        <header>
          <div className="header-all">
            <nav>
              <ul className="header-list">
                <li><a href="#search">検索</a></li>
                <li><a href="#new">新作情報</a></li>
                <li><a href="#ranking">ランキング</a></li>
                <li><a href="#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section className="top">
            <div className="top-all">
              <div className="top-inner">
                <h1 className="top-title">ネイルビュー</h1>
                <div className="top-subtitle">
                  <h2>今日は何色にする？</h2>
                  <p>ネイルポリッシュの情報を集めました<br />皆さんの "可愛い" を探せる場所です</p>
                </div>
              </div>
            </div>
          </section>

          <section id="search" className="search">
            <div className="search-inner">
              <h2 className="font2">検索</h2>
              <div className="search-form">
                <form action="" method="get">
                  <table>
                    <tr>
                      <td>
                         <p>ブランド</p>
                      </td>  
                      <td><input type="search" name="bland" size="30" maxlength="20" /></td>
                    </tr>
                    <tr>
                      <td>
                        <p>カテゴリー</p>
                      </td>
                      <td><input type="search" name="category" size="30" maxlength="20" /></td>
                    </tr>
                    <tr>
                      <td>
                        <p>カラー</p>
                      </td>
                      <td><input type="search" name="color" size="30" maxlength="20" /></td>
                    </tr>
                    <tr>
                      <td>
                        <p>価格</p>
                      </td>
                      <td><input type="search" name="price" size="30" maxlength="20" /></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input className="last" type="submit" value="検索" />
                        <input className="last" type="reset" value="リセット" />
                      </td>
                    </tr>
                  </table>  
               </form>
              </div>
            </div>
          </section>

          {/* newItem */}
          <section id="new" className="new">
            <h2 className="font2">新作情報</h2>
            <div className="info">
              {this.state.newItem.map(
                (ni) => <NewItem title={ni.title} />
              )}
            </div>
          </section>

          {/* ranking */}
          <section id="ranking" className="ranking">
            <h2 className="font2">良いねランキング</h2>
            <div className="good-rank">
              {this.state.likedItem.map(
                (li) => <LikedItem img={li.img} bland={li.bland} ttl={li.ttl} colorttl={li.colorttl} colorSttl={li.colorSttl} />)}
            </div>
          </section>

          <section id="news" className="news">
            <h2 className="font2">お知らせ</h2>
            <div className="news-inner">
              <table>
                {this.state.news.map(
                  (n) => <NewsItem date={n.date} text={n.text} />
                )}
                
              </table>
            </div>
          </section>
        </main>
 
        <footer>
          <div className="footer-inner">
            <nav>
              <ul className="footer-list">
                <li><a href="#search">検索</a></li>
                <li><a href="#new">新作情報</a></li>
                <li><a href="#ranking">ランキング</a></li>
                <li><a href="#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    )
  };
}

export default Page;

// 新作情報の要素
class NewItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <img src={this.props.img} alt="新作" />
        <h3 className="font3">{ this.props.title }</h3>
      </div>
    )
  }
}



// いいねランキングの要素
class LikedItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h3 className="font3">1位</h3>
        <img src={this.props.img} alt="ランク" />
        <h3 className="font3">{ this.props.bland }</h3>
        <h4 className="font4">
          {this.props.ttl}
          <br />{this.props.colorttl}
          <br />{ this.props.colorSttl }</h4>
       </div>
    )
  }
}
const likedItem = new LikedItem();


// お知らせ
class NewsItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{ this.props.date }</td>
        <td>{ this.props.text }</td>
      </tr>
    )
  }
}

ReactDOM.render(
  Page, document.getElementById('root')
);
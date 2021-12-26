import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import './common.css';
import { render } from '@testing-library/react';
import SearchedPage from './searched';
import { Link, useNavigate, useLocation, useParams} from "react-router-dom";
import { App } from './App'

export default class Page extends React.Component{
  constructor(props) {
    super(props);
    let news = [
      { date: "2021/01/01", text: "新しい情報を追加しました" },
      { date: "2021/01/01", text: "新しい情報を追加しました" },
      { date: "2021/01/01", text: "新しい情報を追加しました" }];
    let newItem = [
      { img: "", title: "" },
      { img: "", title: "" },
      { img: "", title: "" }
    ];

    this.state = { news: news, newItem: newItem};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './output.json');
    xhr.onreadystatechange =
      () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json_data = JSON.parse(xhr.responseText);

          newItem = [
            { img: json_data[json_data.length - 1].画像URL,
              title: json_data[json_data.length - 1].ブランド },
            { img: json_data[json_data.length - 2].画像URL,
              title: json_data[json_data.length - 2].ブランド },
            { img: json_data[json_data.length - 3].画像URL,
              title: json_data[json_data.length - 3].ブランド }  
          ];
          this.setState({ newItem: newItem});


          
        }
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
                <li><a href="#search">検索</a></li>
                <li><a href="#new">新作情報</a></li>
                
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

          {/* search */}
          <section id="search" className="search">
            <div className="search-inner">
              <h2 className="font2">検索</h2>
              <div className="search-form">
                <form action="" method="get">
                  <Func/>
               </form>
              </div>
            </div>
          </section>

          {/* newItem */}
          <section id="new" className="new">
            <h2 className="font2">新作情報</h2>
            <div className="info">
              {this.state.newItem.map(
                (ni) => <NewItem img={ni.img} title={ni.title} />
              )}
            </div>
          </section>

          {/* ranking */}
          

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
                <li><a href="#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    )
  };
 }


// 新作情報の要素
class NewItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="container-img">
          <img src={this.props.img} alt="新作" />
        </div>
        <h3 className="font3">{ this.props.title }</h3>
      </div>
    )
  }
}

// いいねランキングの要素

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

let arr;
let param;
let to={pathname:"",search:""};


const Func = () => {
  
  const Navigate = useNavigate();
  const location = useLocation();
  const { Params } = useParams();

  // ボタンを押したときの処理
  const onClick = () => {
    const prop1 = document.form1['ブランド'];
    const index1 = prop1.selectedIndex;
    const result1 = prop1.options[index1].value;

    const prop2 = document.form1['ジャンル'];
    const index2 = prop2.selectedIndex;
    const result2 = prop2.options[index2].value;

    const prop3 = document.form1['色'];
    const index3 = prop3.selectedIndex;
    const result3 = prop3.options[index3].value;

    const prop4 = document.form1['上限価格'];
    const index4 = prop4.selectedIndex;
    const result4 = prop4.options[index4].value;

    const prop5 = document.form1['下限価格'];
    const index5 = prop5.selectedIndex;
    const result5 = prop5.options[index5].value;

    arr = {
      ブランド: result1, ジャンル: result2, 色: result3, 上限価格: result4, 下限価格: result5
    };
    
    param = new URLSearchParams(arr).toString();

    to = {
      pathname: '/searched',
      search: "?"+param
    };
  }
  
  
  return (
    <div>
      <form name="form1">
        <table>
          <tr>
            <td>
              <p>ブランド</p>
            </td>  
            <td>
              <select name="ブランド">
                <option value="" label='未選択'></option>
                <option value="Dior">Dior</option>
                <option value="CHANEL">CHANEL</option>
                <option value="イヴ・サンローラン">イヴ・サンローラン</option>
                <option value="RMK">RMK</option>
                <option value="LUNASOL">LUNASOL</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>カテゴリー</p>
            </td>
            <td>
              <select name="ジャンル">
                <option value="" label='未選択'></option>
                 <option value="エナメル">エナメル</option>
                  <option value="トップコート">トップコート</option>
                  <option value="ベースコート">ベースコート</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>カラー</p>
            </td>
            <td>
              <select name="色">
                <option value="" label='未選択'></option>
                <option value="ベージュ">ベージュ</option>
                <option value="ブラウン">ブラウン</option>
                <option value="オレンジ">オレンジ</option>
                <option value="ピンク">ピンク</option>
                <option value="レッド">レッド</option>
                <option value="ボルドー">ボルドー</option>
                <option value="パープル">パープル</option>
                <option value="グリーン">グリーン</option>
                <option value="ブルー">ブルー</option>
                <option value="ブラック">ブラック</option>
                <option value="ホワイト">ホワイト</option>
                <option value="グレー">グレー</option>
                <option value="シルバー">シルバー</option>
                <option value="ゴールド">ゴールド</option>
                <option value="パール">パール</option>
                <option value="クリア">クリア</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>価格</p>
            </td>
            <td>
              <select name="下限価格">
                <option value="" label='未選択'></option>
                <option value="1000">¥1,000~</option>
                <option value="2000">¥2,000~</option>
                <option value="3000">¥3,000~</option>
                <option value="4000">¥4,000~</option>
              </select> 〜&nbsp;
              <select name="上限価格">
                <option value="" label='未選択'></option>
                <option value="1000">~¥1,000</option>
                <option value="2000">~¥2,000</option>
                <option value="3000">~¥3,000</option>
                <option value="4000">~¥4,000</option>
              </select>
            </td>
          </tr>
        </table> 
      </form>
      <Link to={to}><input className="last" type="submit" value="検索" onClick={onClick}/></Link>
       <input className="last" type="reset" value="リセット" />
    </div>
  )
  
}


ReactDOM.render(
  Page, document.getElementById('root')
);
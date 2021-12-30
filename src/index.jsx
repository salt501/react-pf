import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import './common.css';
import 'react-tabs/style/react-tabs.css';
import { render } from '@testing-library/react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Page extends React.Component{
  constructor(props) {
    super(props);
    let news = [
      { date: "2021/12/30", text: "RMKの新作情報を追加しました" },
      { date: "", text: "" },
      { date: "", text: "" }];
    let newItem = [
      { img: "", link:"", title: "", day:""},
      { img: "", link:"", title: "", day:""},
      { img: "", link:"", title: "", day:""}
    ];

    this.state = { news: news, newItem: newItem, blandSearch: blandSearch,colorSearch:colorSearch};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './output.json');
    xhr.onreadystatechange =
      () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json_data = JSON.parse(xhr.responseText);

          newItem = [
            {
              img: json_data[json_data.length - 1].画像URL,
              link: json_data[json_data.length - 1].URL,
              title: json_data[json_data.length - 1].ブランド,
              day: json_data[json_data.length - 1].発売日
            },
            {
              img: json_data[json_data.length - 2].画像URL,
              link: json_data[json_data.length - 2].URL,
              title: json_data[json_data.length - 2].ブランド,
              day: json_data[json_data.length - 2].発売日
            },
            {
              img: json_data[json_data.length - 3].画像URL,
              link: json_data[json_data.length - 3].URL,
              title: json_data[json_data.length - 3].ブランド,
              day: json_data[json_data.length - 3].発売日
            }
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
                <li><a href="#roughly-search">ざっくり検索</a></li>
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
            <div className="inner">
              <div className="search-inner">
                <h2 className="font2">詳しく検索</h2>
                <div className="search-form">
                  <form action="" method="get">
                    <Func/>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ざっくり検索 */}
          <section id="roughly-search" className="roughly-search">
            <div className="inner">
              <h2 className="font2">ざっくり検索</h2>
              <div className="roughly-inner">
                <Tabs>
                  <TabList>
                    <Tab><h5 className="font5">ブランドで検索</h5></Tab>
                    <Tab><h5 className="font5">色で検索</h5></Tab>
                  </TabList>
                  <TabPanel>
                    <div className="bland-search">
                      {this.state.blandSearch.map(
                        (bs) => <BlandSearch blandImg={bs.blandImg} bland={bs.bland} />
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="color-search">
                      {this.state.colorSearch.map(
                        (cs) => <ColorSearch colorImg={cs.colorImg} color={cs.color} />
                      )}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </section>

          {/* newItem */}
          <section id="new" className="new">
            <div className="inner">
              <h2 className="font2">新作情報</h2>
              <div className="info">
                {this.state.newItem.map(
                  (ni) => <NewItem img={ni.img} link={ni.link} title={ni.title} day={ni.day}/>
                )}
              </div>
            </div>
          </section>

          {/* news */}
          <section id="news" className="news">
            <div className="inner">
              <h2 className="font2">お知らせ</h2>
              <div className="news-inner">
                <table>
                  {this.state.news.map(
                    (n) => <NewsItem date={n.date} text={n.text} />
                  )}
                </table>
              </div>
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
              <p>ご要望やお問い合わせに関しては、<br />制作主のTwitterのDMにて受け付けております。</p>
            </div>
            <p className="copyright">©︎ 2021 Shiori Inc.</p>
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
          <a href={this.props.link}>
            <img src={this.props.img} alt="新作" />
          </a>
        </div>
        <h3 className="font3">{this.props.title}<br />{this.props.day}</h3>
      </div>
    )
  }
}

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

// 検索
let arr;
let param;
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

    window.location = '/searched'+'?'+param;
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
                <option value="1000">¥1,000</option>
                <option value="2000">¥2,000</option>
                <option value="3000">¥3,000</option>
                <option value="4000">¥4,000</option>
              </select> 〜&nbsp;
              <select name="上限価格">
                <option value="" label='未選択'></option>
                <option value="1000">¥1,000</option>
                <option value="2000">¥2,000</option>
                <option value="3000">¥3,000</option>
                <option value="4000">¥4,000</option>
              </select>
            </td>
          </tr>
        </table> 
      </form>
      <input className="last" type="button" value="検索" onClick={onClick}/>
      <input className="last" type="reset" value="リセット" />
    </div>
  )
}

// ブランド検索
let blandSearch = [
  { blandImg: "./Dior.png", bland: "Dior", },
  { blandImg: "./CHANEL.png", bland: "CHANEL", },
  { blandImg: "./YSL.png", bland: "イヴ・サンローラン", },
  { blandImg: "./RMK.png", bland: "RMK", },
  { blandImg: "./ルナソル.png", bland: "LUNASOL", }
];
const BlandSearch = (props) => {
  const onClick = () => {
    let blandsearch = props.bland;
    arr = {
      ブランド: blandsearch
    };
    param = new URLSearchParams(arr).toString();

    window.location = '/searched' + '?' + param;
  }

  return (
    <div className="search-item">
      <button type="button" name="button1" value="ブランド" onClick={onClick}>
        <div className="search-img">
          <img src={props.blandImg} alt="ブランド画像" />
        </div>
        <h3 name="blandSearch" className="blandTitle font3">{props.bland}</h3>
      </button >
    </div >
  )
}


// カラー検索
let colorSearch = [
  { colorImg: "./beige.png", color: "ベージュ" },
  { colorImg: "./brown.png", color: "ブラウン" },
  { colorImg: "./orange.png", color: "オレンジ" },
  { colorImg: "./pink.png", color: "ピンク" },
  { colorImg: "./red.png", color: "レッド" },
  { colorImg: "./bordeaux.png", color: "ボルドー" },
  { colorImg: "./purple.png", color: "パープル" },
  { colorImg: "./green.png", color: "グリーン" },
  { colorImg: "./blue.png", color: "ブルー" },
  { colorImg: "./black.png", color: "ブラック" },
  { colorImg: "./white.png", color: "ホワイト" },
  { colorImg: "./glay.png", color: "グレー" },
  { colorImg: "./silver.png", color: "シルバー" },
  { colorImg: "./gold.png", color: "ゴールド" },
  { colorImg: "./perl.png", color: "パール" },
  { colorImg: "./clear.png", color: "クリア" }
]

const ColorSearch = (props) => {
  const onClick = () => {
    let colorsearch = props.color;
    arr = {
      色: colorsearch
    };
    param = new URLSearchParams(arr).toString();

    window.location = '/searched' + '?' + param;
  }
  
  return (
    <div className="search-item">
      <button type="button" name="button2" value={props.color} onClick={onClick}>
        <div className="search-img">
          <img src={props.colorImg} alt="カラー画像" />
        </div>
        <h3 name="colorSearch" className="color font3">{props.color}</h3>
      </button >
    </div >
  )
}



ReactDOM.render(
  Page, document.getElementById('root')
);
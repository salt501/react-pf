import React from "react";
import ReactDOM from 'react-dom';
import './reset.css';
import './common.css';
import './index.css';
import './searched.css';

class SearchedPage extends React.Component{
  constructor(props) {
    super(props);

    let searchedItem = [
      { img: "https://eco-beauty.dior.com/dw/image/v2/BDGF_PRD/on/demandware.static/-/Sites-master_dior/default/dw894f7beb/assets/Y0002959/Y0002959_F000355155_E01_ZHC.jpg", title: "ディオール ヴェルニ", bland: "Dior", colorttl: "テュララ", colorSttl: "", price: "¥3,300", category: "エナメル", color: "ピンク", link: "https://www.dior.com/ja_jp/products/beauty-Y0996356?gclid=Cj0KCQiAsqOMBhDFARIsAFBTN3fqQQmvbPjO2nEsI2kGxR7wkeNkQa6IS1bSMejYRCOHz0_pdCLo9-saAjS6EALw_wcB&gclsrc=aw.ds" },
      { img: "https://eco-beauty.dior.com/dw/image/v2/BDGF_PRD/on/demandware.static/-/Sites-master_dior/default/dw894f7beb/assets/Y0002959/Y0002959_F000355155_E01_ZHC.jpg", title: "ディオール ヴェルニ", bland: "Dior", colorttl: "テュララ", colorSttl: "", price: "¥3,300", category: "エナメル", color: "ピンク", link: "https://www.dior.com/ja_jp/products/beauty-Y0002959-%25E3%2583%2587%25E3%2582%25A3%25E3%2582%25AA%25E3%2583%25BC%25E3%2583%25AB-%25E3%2583%25B4%25E3%2582%25A7%25E3%2583%25AB%25E3%2583%258B-%25E3%2582%25B8%25E3%2582%25A7%25E3%2583%25AB-%25E3%2583%258D%25E3%2582%25A4%25E3%2583%25AB%25E3%2581%25AE%25E4%25BB%2595%25E4%25B8%258A%25E3%2581%258C%25E3%2582%258A%25E3%2582%2592%25E5%258F%25B6%25E3%2581%2588%25E3%2582%258B%25E3%2582%25AF%25E3%2583%2581%25E3%2583%25A5%25E3%2583%25BC%25E3%2583%25AB-%25E3%2583%25B4%25E3%2582%25A7%25E3%2583%25AB%25E3%2583%258B" }
    ];

    this.state = { searchedItem: searchedItem };

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './output.json');
    xhr.onreadystatechange =
      () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json_data = JSON.parse(xhr.responseText);
          
          // searchedItemの新しい配列を作成する
          
          json_data.map(
            (arr) => {
              delete Object.assign(arr, {['bland']: json_data[0].ブランド})['ブランド']
              
            } 
          );
          console.log(json_data);
         
          searchedItem = json_data.filter(
            function () {
              if (searchedItem.bland === 'Dior')
                return true
            }
          )
          this.setState({ searchedItem: searchedItem })
          
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
                <li><a href="../public/index.html/#search">検索</a></li>
                <li><a href="../public/index.html/#new">新作情報</a></li>
                <li><a href="../public/index.html/#ranking">ランキング</a></li>
                <li><a href="../public/index.html/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section className="searched">
            <div className="searched-all">
              <div className="result-title">
                <h2 className="font2">検索結果</h2>
                <h3 className="font3">◯件</h3>
              </div>

              <div className="searched-list">
                <div className="searched-item">
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
          </section>

          <section className="result">
            {this.state.searchedItem.map(
              (s) => <SearchedItem img={s.img} title={s.title} bland={s.bland} colorttl={s.colorttl} colorSttl={s.colorSttl} price={s.price} category={s.category} color={s.color} link={s.link}/>
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
          <img src={ this.props.img } alt="検索画像" />
        </div>
        <div className="result-container">
          <h3 className="font3">{ this.props.title }</h3>
          <div className="result-txt">
            <h4 className="font4">{ this.props.bland }</h4>
            <div className="txt-inner">
              <p className="colorttl">{ this.props.colorttl }</p>
              <p className="colorSttl">{ this.props.colorSttl }</p>
            </div>
            <div className="result-detail">
              <p className="result-price">{ this.props.price }</p>
              <p>{ this.props.category }</p>
              <p>{ this.props.color }</p>
            </div>
          </div>
        </div>
        <div className="result-btn">
          <button>いいね</button>
          <a className="btn-link" href={this.props.link}>公式サイトへ</a>
        </div>
      </div> 
    )
  }
}

export default SearchedPage;

ReactDOM.render(
  SearchedPage, document.getElementById('root')
);
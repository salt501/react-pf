import React from "react";

class SearchedPage extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <div className="header-all">
            <nav>
              <ul className="header-list">
                <li><a href="./index.html/#search">検索</a></li>
                <li><a href="./index.html/#new">新作情報</a></li>
                <li><a href="./index.html/#ranking">ランキング</a></li>
                <li><a href="./index.html/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    )
  }
}

ReactDOM.render(
  SearchedPage, document.getElementById('root')
);
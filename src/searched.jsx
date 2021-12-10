'use strict';
import react from "react";
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
                <li><a href="./App.jsx/#search">検索</a></li>
                <li><a href="./App.jsx/#new">新作情報</a></li>
                <li><a href="./App.jsx/#ranking">ランキング</a></li>
                <li><a href="./App.jsx/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    )
  }
}
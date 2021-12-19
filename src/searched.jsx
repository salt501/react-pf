import React from "react";
import ReactDOM from 'react-dom';
import './reset.css';
import './common.css';
import './index.css';

class Page extends React.Component{
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
                <li><a href="../public/index.html/#search">検索</a></li>
                <li><a href="../public/index.html/#new">新作情報</a></li>
                <li><a href="../public/index.html/#ranking">ランキング</a></li>
                <li><a href="../public/index.html/#news">お知らせ</a></li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    )
  }
}

ReactDOM.render(
  Page, document.getElementById('s-root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import { render } from '@testing-library/react';

import SearchedPage from "./searched";
import Page from "./index.jsx"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



export class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/"></Link>
            
            <Routes>
              <Route path='/' element={<Page/>} ></Route>
              <Route path='/searched' element={<SearchedPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
    )
  }
}

export class ScrollToTopOnMount extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './app.css';

import Header from '../header';
import Categories from '../categories';
import Questions from '../questions';

import Row from '../row';

export default class App extends Component {

  render() {

    let left = <Categories />
    let right = <Questions />;

    return (
      <div className="app">
        <Header />
        <Router>
          <Row left={left} right={right}/>
        </Router>
      </div>
    );
  };
};

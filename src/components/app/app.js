import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './app.css';

import Header from '../header';
import Categories from '../categories';
import Questions from '../questions';

import Alert from '../alerts';
import { connect } from 'react-redux';

import Row from '../row';

class App extends Component {

  render() {

    console.log(this.props.state)

    let alert = null;

    if (this.props.state[5]) {
      alert = <Alert />
    }

    let left = <Categories />
    let right = <Questions />;

    return (
      <div className="app">
        { alert }
        <Header />
        <Router>
          <Row left={left} right={right}/>
        </Router>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({ state: state })
export default connect(mapStateToProps)(App);

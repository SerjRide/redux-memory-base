import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './app.css';

import Header from '../header';
import Categories from '../categories';
import Questions from '../questions';
import Confirm from '../confirm';

import Alert from '../alerts';
import { connect } from 'react-redux';
// import { waveEffects } from '../../service/effects';

import Row from '../row';

class App extends Component {

  render() {
    let alert = null;
    let left = <Categories />
    let right = <Questions />;
    if (this.props.state[5]) alert = <Alert />

    return (
      <div className="app">
        { alert }
        <Header />
        <Confirm />
        <Router>
          <Row left={left} right={right}/>
        </Router>
      </div>
    );
  };
};


const mapStateToProps = (state) => ({ state: state })
export default connect(mapStateToProps)(App);

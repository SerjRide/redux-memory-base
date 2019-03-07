import React, { Component } from 'react';

import './questions.css';

import Head from './head';
import List from './list';
import Footer from './footer';
import Player from './player';
import Edit from './edit';
import AddQuestion from './add-question';

export default class Questions extends Component {

  render() {

    return(
      <ul className="list-group">
        <Head />
        <List />
        <Footer />
        <AddQuestion />
        <Player />
        <Edit />
      </ul>
    );
  }
};

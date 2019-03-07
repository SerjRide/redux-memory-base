import React, { Component } from 'react';

import './categories.css';

import Head from './head';
import List from './list';
import Footer from './footer';

export default class Categories extends Component {

  render() {

    return(
      <ul className="list-group">
        <Head />
        <List />
        <Footer />
      </ul>
    );
  }

};

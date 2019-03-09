import React from 'react';

import './categories.css';

import Head from './head';
import CreateCategory from './create-category';
import List from './list';
import Footer from './footer';

const Categories = () => {

  return(
    <ul className="list-group">
      <Head />
      <CreateCategory />
      <List />
      <Footer />
    </ul>
  );

}

export default Categories;

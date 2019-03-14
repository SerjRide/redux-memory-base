import React from 'react';

import './categories.css';

import Head from './head';
import CreateCategory from './create-category';
import List from './list';
import { QuestionData,
    alignToFitScreen } from '../../service/question-data.js';

const Categories = () => {
  let scroll = 'disabled'
  if (QuestionData.length > alignToFitScreen()) scroll = ''

  return(
    <ul className="list-group">
      <Head />
      <div className={`list ${ scroll }`}>
        <CreateCategory />
        <List />
      </div>
    </ul>
  );

}

export default Categories;

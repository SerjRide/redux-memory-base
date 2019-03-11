import React from 'react';
import { connect } from 'react-redux';
import { QuestionData, findCountById } from '../../service/question-data.js';

import './questions.css';

import Head from './head';
import List from './list';
import Footer from './footer';
import Player from './player';
import AddQuestion from './add-question';
import Edit from './edit';

const Questions = (props) => {
  const currentCategory = props.state[0]
  const categoryCount = findCountById(currentCategory)
  const currentQuestion = props.state[1]
  const addMenu = props.state[3]
  const editMenu = props.state[4]

  let footer = null;

  console.log(QuestionData[categoryCount].length);

  if (currentCategory) {
    if ( QuestionData[categoryCount].length !== 1 ){
      footer = <Footer />
    }  
  }

  let content = (
    <React.Fragment>
      <Head />
      <List />
      { footer }
    </React.Fragment>
  )

  if (currentQuestion) {
    content = <Player />
  }

  if (addMenu) {
    content = <AddQuestion />
  }

  if (editMenu) {
    content = <Edit />
  }

  return(
    <ul className="list-group">
      {content}
    </ul>
  );
}

const mapStateToProps = (state) => ({ state: state })
export default connect(mapStateToProps)(Questions);

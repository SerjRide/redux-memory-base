import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './edit.css';

export default class Edit extends Component {

  render() {

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active question-bar-head header">
          <Link to="/" className="item crumb question-bar"
            onClick={ () => console.log('Question_list') }>
            Edit Question
          </Link>
        </li>
      </ul>


      <div className='question-area'>
        <textarea
          id="edit_question"
          placeholder='Вопрос'>
        </textarea>
        <textarea
          id="edit_answer"
          onKeyDown={ () => console.log('Apply') }/>
        <button
          type="button" onClick={ () => console.log('Save') }
          className="btn btn-success btn-sm btn-block">
          Save
        </button>
      </div>
      </ React.Fragment>
    );
  }

};

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './add-cuestion.css';

export default class AddQuestion extends Component {

  render() {

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active header add-question">
          <p>Add Question in Category Name</p>
        </li>
      </ul>


      <div className='question-area'>
        <textarea
          id="add_question"
          placeholder='Вопрос'>
        </textarea>
        <textarea
          id="add_answer"
          onKeyDown={ () => console.log('Add') }/>
        <button
          type="button" onClick={ () => console.log('Add') }
          className="btn btn-success btn-sm btn-block">
          Add
        </button>
      </div>
      </ React.Fragment>
    );
  }

};

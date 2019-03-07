import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './player.css';

export default class Player extends Component {

  render() {

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active question-bar-head header">
          <Link to="/" className="item crumb question-bar"
            onClick={ () => console.log('Question_list') }>
            <i className="fas fa-chevron-left crumb"></i>
            categoryName
          </Link>
          <i className="right">2 of 6</i>
        </li>
      </ul>
      <div className="btn-group btn-group-md"
           role="group"
           aria-label="Basic example">
        <button
           data-title="Edit question"
           type="button" onClick={ () => console.log('Edit') }
           className="btn btn-secondary">
           <i className="far fa-edit"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Bookmarks') }
           className="btn btn-secondary"
           data-title="Add to bookmarks">
           <i className="far fa-bookmark"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('First_question') }
           className="btn btn-secondary"
           data-title="Go to the first question">
           <i className="fas fa-angle-double-left"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Prev_question') }
           className="btn btn-secondary"
           data-title="Previous question">
           <i className="fas fa-angle-left"></i>
        </button>
        <div className="input-group">
          <input type="number" onClick={ () => console.log('select_question') }
            className="form-control" id="questionNumber"
            onKeyDown={ () => console.log('onKeyDown') }

            defaultValue={ '2' }

            aria-label="Input group example"
            aria-describedby="btnGroupAddon"/>
        </div>
        <button id="onNextClick"
           type="button" onClick={ () => console.log('next_question') }
           className="btn btn-secondary"
           data-title="Next question">
           <i className="fas fa-angle-right"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Last_question') }
           className="btn btn-secondary"
           data-title="Go to the last question">
           <i className="fas fa-angle-double-right"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Help') }
           className="btn btn-secondary"
           data-title="Show answer">
           <i className="fas fa-question"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Del') }
           className="btn btn-secondary"
           data-title="Delete question">
           <i className="far fa-trash-alt"></i>
        </button>
      </div>


      <div className='question-area'>
        <textarea disabled placeholder='Вопрос'></textarea>
        <textarea id="answer"
        onKeyDown={ () => console.log('Apply') }/>
        <button
          type="button" onClick={ () => console.log('Apply') }
          className="btn btn-success btn-sm btn-block">
          Apply
        </button>
      </div>
      </ React.Fragment>
    );
  }

};

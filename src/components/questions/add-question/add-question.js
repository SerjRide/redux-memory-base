import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategory, alert } from '../../actions';
import {
  QuestionData,
  createQuestion,
  findCountById,
  addCategoryNEW,
  addedInNEW } from '../../../service/question-data.js';

import './add-question.css';

class AddQuestion extends Component {

  check = () => {
    const currentCategory = findCountById(this.props.state[0])
    const id = Date.now();
    const question = this.newQuestion.value;
    const answer = this.newAnswer.value;

    if (question !== '' && answer !== '') {
      createQuestion(currentCategory, question, answer, id)
      addCategoryNEW();
      addedInNEW();
      this.props.alert('Question added');
      this.newQuestion.focus();
      this.newQuestion.value = '';
      this.newAnswer.value = '';
    }

    if (question === '') this.pulseTextarea(this.newQuestion);

    if (answer === '') this.pulseTextarea(this.newAnswer);
  };

  pulseTextarea = (textarea) => {
    textarea.className = 'rename danger';
    setTimeout(() => { textarea.className = 'rename' }, 1800);
    this.props.alert('Both fields must be filled', false)
  };

  onEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.check();
    }
  }

  render() {
    const currentCategory = this.props.state[0]
    const { SelectCategory } = this.props
    const categoryCount = findCountById(currentCategory);
    const categoryName = QuestionData[categoryCount][0].name

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item header">
          <p>Add Question in { categoryName } </p>
          <button
           type="button" onClick={ () => SelectCategory(currentCategory) }
           className="btn btn-secondary list header">
           <i className="fas fa-chevron-up"></i>
          </button>
        </li>
      </ul>


      <div className='question-area'>
        <textarea
          ref={(e) => { this.newQuestion = e }}
          placeholder='Вопрос'>
        </textarea>
        <textarea
          ref={(e) => { this.newAnswer = e }}
          onKeyDown={ this.onEnter }/>
        <button
          type="button"
          onClick={ this.check }
          className="btn btn-success btn-sm btn-block">
          Add
        </button>
      </div>
      </ React.Fragment>
    );
  }

}

const mapStateToProps = (state) => ({ state: state })

const mapDispatchToProps = (dispatch) => {
  return {
    SelectCategory: (id) => dispatch(setCategory(id)),
    alert: (text, type) => dispatch(alert(text, type))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);

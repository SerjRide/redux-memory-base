import React, { Component } from 'react';

import {
  QuestionData,
  changeQuestion,
  findCountById,
  findId,
  addedInNEW } from '../../../service/question-data.js';

import { connect } from 'react-redux';
import { setQuestion, alert } from '../../actions';

import './edit.css';

class Edit extends Component {

  componentDidMount() {
    const currentCategory = findCountById(this.props.state[0])
    const currentQuestion = findCountById(this.props.state[1], false);
    const { question } = QuestionData[currentCategory][currentQuestion]
    const { answer } = QuestionData[currentCategory][currentQuestion]

    this.editQuestionArea.value = question;
    this.editAnswerArea.value = answer;
  }

  check = () => {
    const question = this.editQuestionArea.value
    const answer = this.editAnswerArea.value


    if (question !== '' && answer !== '') {
      const currentCategory = findCountById(this.props.state[0])
      const currentQuestion = findCountById(this.props.state[1], false);

      changeQuestion(currentCategory, currentQuestion, question, answer)
      addedInNEW();
      this.props.alert('Question changed');
      this.props.setQuestion(findId(currentCategory,currentQuestion))
    }

    if (question === '') this.pulseTextarea(this.editQuestionArea);
    if (answer === '') this.pulseTextarea(this.editAnswerArea);
  }

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
    const currentQuestion = this.props.state[1];

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active question-bar-head header">
          <p>Edit Question</p>
          <button
           type="button"
           onClick={ () => this.props.setQuestion(currentQuestion) }
           className="btn btn-secondary list header">
           <i className="fas fa-chevron-up"></i>
          </button>
        </li>
      </ul>

      <div className='question-area'>
        <textarea
          ref={(e) => {this.editQuestionArea = e}}
          placeholder='Вопрос'>
        </textarea>
        <textarea
          ref={(e) => {this.editAnswerArea = e}}
          onKeyDown={ (e) => this.onEnter(e) }/>
        <button
          type="button" onClick={ this.check }
          className="btn btn-success btn-sm btn-block">
          Save
        </button>
      </div>
      </ React.Fragment>
    );
  }

};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    setQuestion: (id) => dispatch(setQuestion(id)),
    alert: (t, type) => dispatch(alert(t, type))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  QuestionData,
  removeQuestion,
  findCountById,
  findId,
  addedInNEW,
  addBookmark } from '../../../service/question-data.js';

import { setQuestion, hidePlayer, editQuestion, alert  } from '../../actions';

import './player.css';

class Player extends Component {

  state = { update: 0 }

  componentDidMount() {
    const currentQuestion = findCountById(this.props.state[1], false);
    this.selectQNamber.value = currentQuestion;
  }

  selectNamber = () => {
    this.selectQNamber.select();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== prevState.update) {
      const currentQuestion = findCountById(this.props.state[1], false);
      this.selectQNamber.value = currentQuestion;
    }
  }

  changeQuestion = (action) => {
    const { setQuestion } = this.props
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    const length = QuestionData[currentCategory].length - 1
    const { question } = QuestionData[currentCategory][currentQuestion];
    const value = Number(this.selectQNamber.value);
    this.answerArea.className = 'you-answer'
    let count;

    if (action === '+') {
      if (currentQuestion === length) {
        setQuestion(findId(currentCategory,1));
      } else {
        count = currentQuestion + 1
        setQuestion(findId(currentCategory,count));
      }
    }
    if (action === '-') {
      if (currentQuestion === 1) {
          setQuestion(findId(currentCategory,length));
      } else {
        count = currentQuestion - 1
        setQuestion(findId(currentCategory,count));
      }
    }
    if (action === '<<') setQuestion(findId(currentCategory,1));
    if (action === '>>') setQuestion(findId(currentCategory,length));
    if (action === 'number') {
      if (value > length || value < 1) {
        this.props.alert('Question not found', false);
        this.selectQNamber.value = currentQuestion;
      } else {
        setQuestion(findId(currentCategory,value));
      }

    }

    this.setState({ update: this.state.update + 1});
    this.questionArea.value = question;
    this.answerArea.value = '';
  }

  help = () => {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    const { answer } = QuestionData[currentCategory][currentQuestion];
    this.answerArea.value = answer;
    this.fastCheck();
  }

  fastCheck = () => {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    const { answer } = QuestionData[currentCategory][currentQuestion];
    if (this.answerArea.value === answer) {
      this.answerArea.className = 'you-answer success'
    } else this.answerArea.className = 'you-answer'
  }

  check = () => {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    const { answer } = QuestionData[currentCategory][currentQuestion];
    if (this.answerArea.value === answer){
      this.changeQuestion('+');
      this.props.alert('Answer is correct')
    } else this.pulseTextarea(this.answerArea)
  };

  pulseTextarea = (textarea) => {
    textarea.className = 'you-answer danger';
    setTimeout(() => { textarea.className = 'you-answer' }, 1800);
    this.props.alert('Answer is not correct', false)
  };

  deleteQuestion = (currentCategory, currentQuestion) => {
    const { length } = QuestionData[currentCategory];
    const text = 'Are you sure?';

    if (window.confirm(text)) {
      removeQuestion(currentCategory, currentQuestion);
      addedInNEW();
      addBookmark();

      if (length !== 2 || currentQuestion !== length - 1) {
        this.props.setQuestion(findId(currentCategory, currentQuestion))
      }

      if (length === 2) {
        this.props.hidePlayer()
      } else if (currentQuestion === length - 1) {
        this.props.setQuestion(findId(currentCategory, currentQuestion - 1))
      }
    }

  }

  onEnter = (e, func) => {
    if (e.which === 13) {
      e.preventDefault();
      func();
    }
  }

  checkOnDisabled = (e, func) => {
    let obj = e.target.classList
    for (let key in obj) {
      if (obj[key] === 'disabled') {
        return null
      }
    }
    func();
  }

  linkOnEdit = () => {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    this.props.editQuestion(findId(currentCategory ,currentQuestion))
  }

  addBookmarkBtn = () => {
    const categoryCount = findCountById(this.props.state[0]);
    const questionCount = findCountById(this.props.state[1], false);
    const currentQuestion = this.props.state[1];
    const { bookmark } = QuestionData[categoryCount][questionCount]
    addBookmark(currentQuestion);
    this.setState({ update: this.state.update + 1});
    if (!bookmark) this.props.alert('Question added to bookmarks')
    if (bookmark) this.props.alert('Question removed from bookmarks')

  }

  render() {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);

    const { length } = QuestionData[currentCategory]
    const { name } = QuestionData[currentCategory][0];
    const { question } = QuestionData[currentCategory][currentQuestion];
    const categoryId =this.props.state[0]
    let insideDate = [], stock;
    QuestionData[1].map((item, i) => insideDate[i] = item.date )
    if (insideDate.indexOf(QuestionData[currentCategory][currentQuestion].date) !== -1) {
      stock = `fas`
    } else stock = `far`

    let disabled = ``;
    if (categoryId === 1111 || categoryId === 2222) disabled = `disabled`;

    return(
      <React.Fragment>
      <ul className="list-group" id="question_list">
        <li className="list-group-item no-active question-bar-head header">
          <Link
            to="/"
            className="item crumb question-bar"
            onClick={ () => this.props.hidePlayer() }>
            <i className="fas fa-chevron-left crumb"></i>
            { name }
          </Link>
          <i className="right">
            { currentQuestion } of { length - 1 }
          </i>
        </li>
      </ul>
      <div className="btn-group btn-group-md"
           role="group"
           aria-label="Basic example">
        <button
           data-title="Edit question"
           type="button"
           onClick={ (e) => this.checkOnDisabled(e, this.linkOnEdit) }
           className={`btn btn-secondary ${disabled}`}>
           <i className={`far fa-edit ${disabled}`}></i>
        </button>
        <button
           type="button"
           onClick={ (e) => this.checkOnDisabled(e, this.addBookmarkBtn) }
           className={`btn btn-secondary ${disabled}`}
           data-title="Add to bookmarks">
           <i className={`${stock} fa-bookmark ${disabled}`}></i>
        </button>
        <button
           type="button" onClick={ () => this.changeQuestion('<<') }
           className="btn btn-secondary"
           data-title="Go to the first question">
           <i className="fas fa-angle-double-left"></i>
        </button>
        <button
           type="button" onClick={ () => this.changeQuestion('-') }
           className="btn btn-secondary"
           data-title="Previous question">
           <i className="fas fa-angle-left"></i>
        </button>
        <div className="input-group">
          <input type="number" onClick={ this.selectNamber }
            className="form-control" id="questionNumber"
            onKeyDown={ (e) => this.onEnter(e, () => this.changeQuestion('number')) }
            ref={ (e) => { this.selectQNamber = e }}
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"/>
        </div>
        <button id="onNextClick"
           type="button" onClick={ () => this.changeQuestion('+') }
           className="btn btn-secondary"
           data-title="Next question">
           <i className="fas fa-angle-right"></i>
        </button>
        <button
           type="button" onClick={ () => this.changeQuestion('>>') }
           className="btn btn-secondary"
           data-title="Go to the last question">
           <i className="fas fa-angle-double-right"></i>
        </button>
        <button
           type="button" onClick={ this.help }
           className="btn btn-secondary"
           data-title="Show answer">
           <i className="fas fa-question"></i>
        </button>
        <button
           type="button"
           onClick={

             (e) => this.checkOnDisabled(e,
               () => this.deleteQuestion(currentCategory, currentQuestion)
             )

           }
           className={`btn btn-secondary ${disabled}`}
           data-title="Delete question">
           <i className={`far fa-trash-alt ${disabled}`}></i>
        </button>
      </div>


      <div className='question-area'>
        <textarea
          value={ question }
          ref={(e) => { this.questionArea = e }}
          disabled/>
        <textarea
          onChange={ this.fastCheck }
          className="you-answer"
          ref={(e) => { this.answerArea = e }}
          id="answer"
          onKeyDown={ (e) => this.onEnter(e, this.check) }/>
        <button
          type="button" onClick={ this.check }
          className="btn btn-success btn-sm btn-block">
          Apply
        </button>
      </div>
      </ React.Fragment>
    );
  }

}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    setQuestion: (id) => dispatch(setQuestion(id)),
    hidePlayer: () => dispatch(hidePlayer()),
    editQuestion: (id) => dispatch(editQuestion(id)),
    alert: (text,type) => dispatch(alert(text,type))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

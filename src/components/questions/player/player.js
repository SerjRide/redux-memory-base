import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  QuestionData, removeQuestion, findCountById, findId,
  addedInNEW, addBookmark } from '../../../service/question-data.js';

import { setQuestion, hidePlayer, editQuestion, alert,
  update, confirm  } from '../../actions';

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

  doneQuestionList = (text) =>{
    const categoryCount = findCountById(this.props.state[0])
    console.log(`questionListDone ${categoryCount}`)
    console.log(text)
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

  deleteQuestion = (currentQuestion) => {
    const categoryCount = findCountById(this.props.state[0])
    let link = findId(categoryCount, currentQuestion);
    if (this.props.state[0] === 1111) {
      link = link + Math.pow(10,12)
      if (QuestionData[0].length === 2) this.props.update();
    }
    if (this.props.state[0] === 2222) {
      link = link + Math.pow(10,11)
      if (QuestionData[0].length === 2) this.props.update();
    }
    const { length } = QuestionData[categoryCount];
    removeQuestion(findCountById(link), findCountById(link, false))
    addedInNEW();
    addBookmark();

    if (length !== 2 || currentQuestion !== length - 1) {
      this.props.setQuestion(findId(categoryCount, currentQuestion))
    }

    if (length === 2) {
      this.props.hidePlayer()
    } else if (currentQuestion === length - 1) {
      this.props.setQuestion(findId(categoryCount, currentQuestion - 1))
    }

  }

  onEnter = (e, func) => {
    if (e.keyCode === 13 && !e.shiftKey) {
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

  inputValues = (name, func) => {
    let selectName = () => {
      document.getElementById('modal_input').focus()
      document.getElementById('modal_input').select()
    }
    let now = this.dateConverter(new Date())
    let recomend_date = this.dateRecomender(name).recomend
    console.log(document.getElementById('modal_input'))
    document.getElementById('modal_input').value = now + ' - ' + recomend_date;
    setTimeout(() => (selectName()), 100)
    func()
  }

  dateConverter = (date, stamp = 0) => {
    if (typeof(date) === 'number') {
      let seconds = date / 1000
      let minutes = seconds / 60
      let hours = minutes / 60
      let days = (hours / 24) - 1
      return days
    }

    if (typeof(date) === 'string') {
      let day = +date.substring(0, 2)
      let month = +date.substring(3, 5)
      let year = +('20' + date.substring(6))
      let timestamp = (new Date(year, month - 1, day)).getTime()
      return timestamp
    }

    if (typeof(date) === 'object') {
      let day   =  '' + date.getDate();
      let month =  '' + (date.getMonth() + 1);
      let year  = ('' + date.getFullYear()).substring(2)
      if (day.length   === 1)   day = '0' + day
      if (month.length === 1) month = '0' + month
      return `${day}.${month}.${year}`
    }
  }

  dateRecomender = (name) => {
    let first  = name.split(' - ')[0]
    let second = name.split(' - ')[1]
    let firstStamp = this.dateConverter(first)
    let secondStamp = this.dateConverter(second)
    let difference = secondStamp - firstStamp
    let dayPass = this.dateConverter(difference)
    let recomend = this.dateConverter(new Date(secondStamp + difference))
    return {pass: dayPass, recomend: recomend}
  }

  linkOnEdit = () => {
    const currentCategory = findCountById(this.props.state[0]);
    const currentQuestion = findCountById(this.props.state[1], false);
    this.props.editQuestion(findId(currentCategory ,currentQuestion))
  }

  addBookmarkBtn = () => {
    let categoryCount, questionCount, currentQuestion;
    if (this.props.state[0] === 2222 || this.props.state[0] === 1111) {
      let link
      const id = this.props.state[1]
      if (this.props.state[0] === 1111) link = id + Math.pow(10,12)
      if (this.props.state[0] === 2222) link = id + Math.pow(10,11)
      categoryCount = findCountById(link)
      questionCount = findCountById(link, false);
      const questionCountInNew = findCountById(this.props.state[1], false);
      currentQuestion = link;
      const length = QuestionData[1].length

      if (this.props.state[0] === 2222) {
        if (length !== 2 || questionCountInNew !== length - 1) {
          this.props.setQuestion(findId(1, questionCountInNew + 1))
        }

        if (length === 2) {
          this.props.update();
        } else if (questionCountInNew === length - 1) {
          this.props.setQuestion(findId(1, questionCountInNew - 1))
        }
      }

    } else {
      categoryCount = findCountById(this.props.state[0]);
      questionCount = findCountById(this.props.state[1], false);
      currentQuestion = this.props.state[1];
    }
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
    let insideDate = [], stock;
    QuestionData[1].map((item, i) => insideDate[i] = item.date )
    if (insideDate.indexOf(QuestionData[currentCategory][currentQuestion].date) !== -1) {
      stock = `fas`
    } else stock = `far`

    let data_title = `Add to bookmarks`;
    let text = 'Вы действительно хотите удалить вопрос?'
    if (this.props.state[0] === 1111 || this.props.state[0] === 2222) {
      const questionId = this.props.state[1];
      let index;
      if (this.props.state[0] === 1111) index = Math.pow(10,12)
      if (this.props.state[0] === 2222) index = Math.pow(10,11)
      const questionLink = findCountById(questionId + index)
      const categoryName = QuestionData[questionLink][0].name
      text = `Вы действительно хотите удалить
      этот вопрос? Вопрос так же будет удалён из категории ${categoryName}`;
    }

    let report = `прошло дней с момента повторения:
      ${this.dateRecomender(name).pass}`;

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
           className={`btn btn-secondary`}>
           <i className={`far fa-edit`}></i>
        </button>
        <button
           type="button"
           onClick={ this.addBookmarkBtn }
           className={`btn btn-secondary`}
           data-title={ data_title }>
           <i className={`${stock} fa-bookmark`}></i>
        </button>
        <button
           type="button" onClick={

             () => this.inputValues(name,
             () => this.props.confirm(report,
             () => this.doneQuestionList(this.props)))

           }
           className="btn btn-secondary"
           data-title="Question list done">
           <i className="fa fa-check"></i>
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
             ( ) => this.props.confirm(text,
             ( ) => this.deleteQuestion(currentQuestion)))

           }
           className={`btn btn-secondary`}
           data-title="Delete question">
           <i className={`far fa-trash-alt`}></i>
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
    alert: (text,type) => dispatch(alert(text,type)),
    update: () => dispatch(update()),
    confirm: (text, func, id) => dispatch(confirm(text, func, id))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

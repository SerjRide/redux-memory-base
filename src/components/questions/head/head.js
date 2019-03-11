import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  QuestionData,
  findCountById } from '../../../service/question-data.js';

import { addNewQuestion, questionSearch } from '../../actions';

class Head extends Component {

  search = (e) => {
    this.props.questionSearch(e.target.value)
  }

  render() {
    const categoryCount = findCountById(this.props.state[0])
    const categoryName = QuestionData[categoryCount][0].name
    let button;
    if (this.props.state[0] === null) {
      button = null;
    } else {
      button = (
        <React.Fragment>
          <input
            defaultValue={this.props.state[8]}
            onChange={ (e) => this.search(e) }
            className="search"
            type="text"
            placeholder="search"/>
          <button
            type="button" onClick={ (e) => this.props.addNewQuestion(e) }
            className="btn btn-secondary list head"
            data-title="Add question">
            <i className="fas fa-plus"></i>
          </button>
        </React.Fragment>
      )
    }

    return (
      <li className="list-group-item header">
        <p>{ categoryName }</p>
        { button }
      </li>
    )
  }

};
const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    addNewQuestion: () => dispatch(addNewQuestion()),
    questionSearch: (text) => dispatch(questionSearch(text))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Head);

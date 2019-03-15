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
    const categoryId = this.props.state[0]
    const categoryCount = findCountById(categoryId)
    const categoryName = QuestionData[categoryCount][0].name
    let button, addButton;
    addButton = (
      <button
        type="button" onClick={ (e) => this.props.addNewQuestion(e) }
        className="btn btn-secondary list head"
        data-title="Add question">
        <i className="fas fa-plus"></i>
      </button>
    )

    if (categoryId === 1111 || categoryId === 2222) addButton = null;
    if (categoryId === null) {
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
          { addButton }
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

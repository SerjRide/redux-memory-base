import React from 'react';
import {
  QuestionData,
  removeQuestion,
  findId,
  findCountById,
  addedInNEW } from '../../../service/question-data.js';

import {
  setCategory,
  setQuestion,
  editQuestion,
  addNewQuestion } from '../../actions';

import { connect } from 'react-redux';

const List = (props) => {

  const currentCategory = findCountById(props.state[0]);
  let content;

  const delQuestion = (id) => {
    const text = 'Are you sure?';
    if (window.confirm(text)) {
      removeQuestion(currentCategory, findCountById(id, false))
      addedInNEW();
      props.setCategory(findId(currentCategory))
    }
  }

  const checkOnDisabled = (e, func) => {
    let obj = e.target.classList
    for (let key in obj) {
      if (obj[key] === 'disabled') {
        return null
      }
    }
    func();
  }

  if (!currentCategory) {
    content = (
      <li className="list-group-item item">
        <p className="empty">Select a category of questions</p>
      </li>
    )
  };

  if (currentCategory !== null) {

    const search = (items, term) => {
      if (term.length === 0) return items;

      return items.filter((item, i) => {
        if (i !== 0) return item.question
                                .toLowerCase()
                                .indexOf(term.toLowerCase()) > -1;
        return null
      })
    }

    const term = props.state[8]
    let visibleItems = search(QuestionData[currentCategory], term);

    if (QuestionData[currentCategory] !== undefined) {
      content = visibleItems.map((item, i) => {

        let { question } = visibleItems[i]

        if (visibleItems[i].question === undefined) return null

        if (String(visibleItems[i].question).length > 30) {
          question = String(visibleItems[i].question).substring(0,30) + '...';
        }

        const newCategoryId = props.state[0]
        const bookmarksCategoryId = props.state[0]
        let disabled = newCategoryId === 1111 ? `disabled` : ``
        disabled = bookmarksCategoryId === 2222 ? `disabled` : ``

        const { id } = item
        return (
          <li key={ id }
            className="list-group-item item">
            <p onClick={ () => props.onSelectQuestion(id) }>
              { question }
            </p>
            <button
               type="button"
               onClick={ (e) => checkOnDisabled(e, () => props.editQuestion(id)) }
               data-title="Edit Question"
               className={`btn btn-secondary list ${disabled}`}>
               <i className={`far fa-edit ${disabled}`}></i>
            </button>
            <button
              type="button"
              onClick={ (e) => checkOnDisabled(e, () => delQuestion(id)) }
              data-title="Delete Question"
              className={`btn btn-secondary list ${disabled}`}>
              <i className={`far fa-trash-alt ${disabled}`}></i>
            </button>
          </li>
        )
      })

    };

    if (props.state[0] === null) {
      content = (
        <li className="list-group-item item">
          <p className="empty">
            Select a category of questions
          </p>
        </li>
      )
    }

    if (props.state[0] !== null) {
      if (QuestionData[currentCategory].length === 1)
      content = (
        <li className="list-group-item item">
          <p onClick={ () => props.addNewQuestion() }
            className="empty">+ Add Question
          </p>
        </li>
      )
    }

  }

  return content;

};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    setCategory: (id) => dispatch(setCategory(id)),
    onSelectQuestion: (id) => dispatch(setQuestion(id)),
    editQuestion: (id) => dispatch(editQuestion(id)),
    addNewQuestion: () => dispatch(addNewQuestion())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(List);

import React from 'react';
import {
  QuestionData,
  removeQuestion,
  findId,
  findCountById } from '../../../service/question-data.js';

import {
  setCategory,
  setQuestion,
  editQuestion,
  addNewQuestion } from '../../actions';

import { connect } from 'react-redux';

const List = (props) => {

  findId()

  const currentCategory = findCountById(props.state[0]);
  let content;

  const delQuestion = (id) => {
    removeQuestion(currentCategory, findCountById(id, false))
    props.setCategory(findId(currentCategory))
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
        if (visibleItems[i].question === undefined) return null

          // <li className="list-group-item item">
          //   <p onClick={ () => props.addNewQuestion() }
          //     className="empty">+ Add Question
          //   </p>
          // </li>


        const { id } = item
        return (
          <li key={ id }
            className="list-group-item item">
            <p onClick={ () => props.onSelectQuestion(id) }>
              { visibleItems[i].question }
            </p>
            <button
               type="button" onClick={ () => props.editQuestion(id) }
               data-title="Edit Question"
               className="btn btn-secondary list">
               <i className="far fa-edit"></i>
            </button>
            <button
              type="button" onClick={ () => delQuestion(id) }
              data-title="Delete Question"
              className="btn btn-secondary list">
              <i className="far fa-trash-alt"></i>
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

import React, { Component } from 'react';
import {
  QuestionData,
  removeQuestion,
  findId,
  findCountById } from '../../../service/question-data.js';

import {
  setCategory,
  setQuestion,
  editQuestion,
  addNewQuestion,
  questionList } from '../../actions';

import { connect } from 'react-redux';

class List extends Component {

  state = {
    update: 0
  }

  componentDidMount() {
    this.renderList();
    setTimeout( () => this.synch() );
  }

  componentDidUpdate() {
    if (this.state.update !== this.props.state[11][1]) {
      this.update();
    }
  }

  update = () => {
    this.renderList()
    this.setState({
      update: this.state.update + 1
    })
  }

  delQuestion = (id) => {
    const currentCategory = findCountById(this.props.state[0]);
    removeQuestion(currentCategory, findCountById(id, false))
    this.props.setCategory(findId(currentCategory))
    const obj = this.props.state[11][0]
    const nextUpdateCount = this.props.state[11][1] + 1
    const activePage = this.props.state[11][2]
    const totalPage = this.props.state[11][3]
    this.props.questionList([obj, nextUpdateCount, activePage, totalPage])
    // this.synch();
  }

  search = (items, term) => {
    if (term.length === 0) return items;

    return items.filter((item, i) => {
      if (i !== 0) return item.question
                              .toLowerCase()
                              .indexOf(term.toLowerCase()) > -1;
      return null
    })
  }

  synch = () => {
    this.renderList();
    const obj = QuestionData[findCountById(this.props.state[0])]
    const { length } = obj
    const totalPages = Math.ceil((length - 1) / 5);
    const currentObj = this.props.state[11][0];
    const active = this.props.state[11][2];
    const update = this.props.state[11][1];
    this.props.questionList([currentObj, update, active, totalPages])
  }

  pageOutput = (items) => {
    const currentPage = this.props.state[11][2]
    const count = currentPage === 0 ? currentPage * 6 : currentPage * 5
    if (currentPage === 0) {
      return items.filter((item, i) => {
        if (i < count || i >= count + 6) return null
        return item
      });
    } else {
      return items.filter((item, i) => {
        if (i <= count || i > count + 5) return null
        return item
      });
    }
  }

  renderList = () => {
    const currentCategory = findCountById(this.props.state[0]);
    let content;

    if (!currentCategory) {
      content = (
        <li className="list-group-item item">
          <p className="empty">Select a category of questions</p>
        </li>
      )
    };

    if (currentCategory !== null) {

      const term = this.props.state[8]
      let searchingItems = this.search(QuestionData[currentCategory], term);
        let visibleItems = this.pageOutput(searchingItems);

      if (QuestionData[currentCategory] !== undefined) {

        content = visibleItems.map((item, i) => {
          if (visibleItems[i].question === undefined) return null

          const { id } = item
          return (
            <li key={ id }
              className="list-group-item item">
              <p onClick={ () => this.props.onSelectQuestion(id) }>
                { visibleItems[i].question }
              </p>
              <button
                 type="button" onClick={ () => this.props.editQuestion(id) }
                 data-title="Edit Question"
                 className="btn btn-secondary list">
                 <i className="far fa-edit"></i>
              </button>
              <button
                type="button" onClick={ () => this.delQuestion(id) }
                data-title="Delete Question"
                className="btn btn-secondary list">
                <i className="far fa-trash-alt"></i>
              </button>
            </li>
          )
        })

      };

      if (this.props.state[0] === null) {
        content = (
          <li className="list-group-item item">
            <p className="empty">
              Select a category of questions
            </p>
          </li>
        )
      }

      if (this.props.state[0] !== null) {
        if (QuestionData[currentCategory].length === 1)
        content = (
          <li className="list-group-item item">
            <p onClick={ () => this.props.addNewQuestion() }
              className="empty">+ Add Question
            </p>
          </li>
        )
      }

    }
    const update = this.props.state[11][1];
    const activePage = this.props.state[11][2]
    const totalPage = this.props.state[11][3]
    this.props.questionList([content, update, activePage, totalPage]);
    return content

  }

  render () {
    const content = this.props.state[11][0]
    // const content = <div></div>
    return (
      <React.Fragment>
       { content }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    setCategory: (id) => dispatch(setCategory(id)),
    onSelectQuestion: (id) => dispatch(setQuestion(id)),
    editQuestion: (id) => dispatch(editQuestion(id)),
    addNewQuestion: () => dispatch(addNewQuestion()),
    questionList: (content) => dispatch(questionList(content))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(List);

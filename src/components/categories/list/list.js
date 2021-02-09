import React, { Component } from 'react';

import {
  QuestionData,
  removeCategory,
  rename,
  findCountById,
  addedInNEW,
  addBookmark } from '../../../service/question-data.js';

import {
  setCategory,
  update,
  editCategory,
  alert,
  confirm } from '../../actions';

import { connect } from 'react-redux';

class List extends Component {

  delCategory = (id) => {
      removeCategory(id)
      addedInNEW();
      addBookmark();
      this.props.update()
  };

  startEdit = (id) => {
    const count = findCountById(id)
    const name = QuestionData[count][0].name
    document.getElementById(`rename_${id}`).value = name;
    document.getElementById(`category_${id}`).style.display = 'none';
    document.getElementById(`form_${id}`).style.display = 'flex';
    document.getElementById(`rename_${id}`).focus();
  }

  closeEdit = (id) => {
    document.getElementById(`category_${id}`).style.display = 'flex';
    document.getElementById(`form_${id}`).style.display = 'none';
  }

  check = (id) => {
    const name = document.getElementById(`rename_${id}`).value
    if (name !== '') {
      rename(findCountById(id),name);
      this.props.update();
      this.props.alert('Category renamed');
      this.closeEdit(id);

    } else {
      document.getElementById(`rename_${id}`)
        .className = 'rename danger';

      setTimeout(() => {
        document.getElementById(`rename_${id}`)
          .className = 'rename';
      }, 1800);

      this.props.alert('The category must have a name', false)
    }
  }

  onEnter = (e, id) => {
    if (e.which === 13) {
      e.preventDefault();
      this.check(id);
    }
  }

  search = (items, term) => {

    if (term.length === 0) return items;

    return items.filter((item) => {
      return item[0].name
              .toLowerCase()
              .indexOf(term.toLowerCase()) > -1;
    })
  }

  render() {
    const term = this.props.state[7]
    let visibleItems = this.search(QuestionData, term);
    const items = visibleItems.map((item, i) => {

      const { name, id } = item[0];
      const { length } = visibleItems[i];
      let buttons_1, buttons_2;
      let newQuestion = id === 1111 ? <i className="fas fa-fire"></i> : null
      let bookmarks = id === 2222 ? <i className="fas fa-bookmark"></i> : null
      let del_text = 'Вы действительно хотите безвозвратно удалить эту категорию вопросов?'

      if (id !== 1111 && id !== 2222) {
        buttons_1 = (
          <React.Fragment>
            <button
               type="button" onClick={ () => this.startEdit(id) }
               className="btn btn-secondary list">
               <i className="far fa-edit"></i>
            </button>
            <button
              type="button" onClick={ () => {

                this.props.confirm(del_text, this.delCategory, id) }

              }
              className="btn btn-secondary list">
              <i className="far fa-trash-alt"></i>
            </button>
          </React.Fragment>
        )
        buttons_2 = (
          <React.Fragment>
            <button
               type="button" onClick={ () => this.check(id) }
               data-title="Apply"
               className="btn btn-secondary list">
               <i className="fas fa-check"></i>
            </button>
            <button
              type="button" onClick={ () => this.closeEdit(id) }
              className="btn btn-secondary list">
              <i className="fas fa-times"></i>
            </button>
          </React.Fragment>
        )
      }

      let display = '';
      if (id === 1111) {
        if (QuestionData[0][0].display === false) display = 'hide'
      }
      if (id === 2222) {
        if (QuestionData[1][0].display === false) display = 'hide'
      }


      return(
        <li key={ id } className={`over_li ${display}`}>
          <ul className="under_ul">

            <li id={`category_${id}`}
              className="list-group-item item">
              <p onClick={ () => this.props.onSelectCategory(id) }>
                { newQuestion }
                { bookmarks }
                { name }<span className="badge badge-success">
                {length - 1}</span>
              </p>
              { buttons_1 }
            </li>

            <li id={`form_${id}`}
              className="list-group-item item editCategoryInput">
              <input id={`rename_${id}`}
                onKeyDown={ (e) => this.onEnter(e, id) }
                className="rename"
                type="text" />
              { buttons_2 }
            </li>

          </ul>
        </li>
      )
    });

    return(
      <React.Fragment>
        { items }
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({ state: state })

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCategory: (id) => dispatch(setCategory(id)),
    update: () => dispatch(update()),
    editCategory: () => dispatch(editCategory()),
    alert: (text, type) => dispatch(alert(text, type)),
    confirm: (text, func, id) => dispatch(confirm(text, func, id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

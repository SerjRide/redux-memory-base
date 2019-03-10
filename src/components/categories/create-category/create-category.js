import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  QuestionData,
  createCategory } from '../../../service/question-data.js';

import { update, alert, changeCategoryPage } from '../../actions';

import './create-category.css';

class CreateCategory extends Component {

  check = () => {
    const { value } = this.newCategoryInput
    if (value !== '') {
      const id = Date.now();
      createCategory(value, id);
      this.props.update();
      this.synch();
      this.newCategoryInput.value = '';
      this.props.alert('Category created');
    } else {
      this.newCategoryInput.className = 'form-control danger';
      setTimeout(() => {
        this.newCategoryInput.className = 'form-control';
      }, 1800);
      console.log(this.newCategoryInput.className);
      this.props.alert('The category must have a name', false);
    }
  };

  synch = (obj = QuestionData) => {
    const { length } = obj
    const totalPages = Math.ceil(length / 5);
    const active = this.props.state[9][0]
    this.props.changeCategoryPage([active, totalPages])
  }

  onEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.check();
    }
  }

  render() {

    return(
        <li className="list-group-item item">
          <form>
            <div className ="form-group categories">
              <input type="text" onClick={ () => console.log('resetStyle') }
                onKeyDown={ (e) => this.onEnter(e) }
                className="form-control"
                id="categoryName"
                ref={(e) => { this.newCategoryInput = e }}
                placeholder="Create new category" />
            </div>
            <button
               type="button" onClick={ this.check }
               className="btn btn-secondary list"
               data-title="Add category">
               <i className="fas fa-plus"></i>
            </button>
          </form>
        </li>
    )
  }
};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    update: () => dispatch(update()),
    alert: (text,type) => dispatch(alert(text,type)),
    changeCategoryPage: (num) => dispatch(changeCategoryPage(num))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)

import React, { Component } from 'react';

import {
  QuestionData,
  removeCategory,
  rename,
  findCountById } from '../../../service/question-data.js';

//импорты для доступа к state'у
import {
  setCategory,
  update,
  editCategory,
  alert,
  changeCategoryPage } from '../../actions';

import { connect } from 'react-redux';

class List extends Component {

  state = {
    pageOutput: 0
  }

  componentDidMount () {
    this.pageOutput(0);
  }

  componentDidUpdate () {
    if (this.props.state[2] !== this.state.pageOutput){
      this.update();
    }
  }

  update = () => {
    if (this.props.state[2]){
      const selectPage = this.props.state[9][1]
      this.pageOutput(selectPage);
    }
    this.setState({
      pageOutput: this.state.pageOutput + 1
    })
  }



  pageOutput = (start) => {

    const max = 5;
    let { length } = this.Block.childNodes,
    pages = 1;

    for (var i = max; i < length; i++) {
      if (i % max === 0) ++pages
    }

    for (var i = 0; i < length; i++) {
      if (i >= start && i < start + max) {
        console.log(document.getElementById(`category_block_${i}`));
        document.getElementById(`category_block_${i}`)
          .style.display = 'flex';
      } else {
        console.log(document.getElementById(`category_block_${i}`));
        document.getElementById(`category_block_${i}`)
          .style.display = 'none';
      }
    }

    this.props.changeCategoryPage([pages, this.props.state[9][1]]);
    console.log('elements:', length)
    console.log('pages:', pages)

  };




  delCategory = (id) => {
    removeCategory(id)
    this.props.update()
  };

  startEdit = (id) => {
    const count = findCountById(id)
    const name = QuestionData[count][0].name
    console.log(QuestionData[count][0].name)
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

    if (name !== '' && String(name).length < 25) {
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
      return item[0].name.indexOf(term) > -1;
    })

    this.props.update();
  }

  render() {
    console.log('перерисовка');
    const term = this.props.state[7]
    let visibleItems = this.search(QuestionData, term);
    const items = visibleItems.map((item, i) => {

      const { name, id } = item[0];

      return(
        <li
          key={ id }
          className="over_li"
          id={`category_block_${i}`}>
          <ul className="under_ul">

            <li id={`category_${id}`}
              className="list-group-item item">
              <p onClick={ () => this.props.onSelectCategory(id) }>
                { name }
              </p>
              <button
                 type="button" onClick={ () => this.startEdit(id) }
                 data-title="Rename Category"
                 className="btn btn-secondary list">
                 <i className="far fa-edit"></i>
              </button>
              <button
                type="button" onClick={ () => this.delCategory(id) }
                data-title="Delete Category"
                className="btn btn-secondary list">
                <i className="far fa-trash-alt"></i>
              </button>
            </li>

            <li id={`form_${id}`}
              className="list-group-item item editCategoryInput">
              <input id={`rename_${id}`}
                onKeyDown={ (e) => this.onEnter(e, id) }
                className="rename"
                type="text" />
              <button
                 type="button" onClick={ () => this.check(id) }
                 data-title="Apply"
                 className="btn btn-secondary list">
                 <i className="fas fa-check"></i>
              </button>
              <button
                type="button" onClick={ () => this.closeEdit(id) }
                data-title="Cancel"
                className="btn btn-secondary list">
                <i className="fas fa-times"></i>
              </button>
            </li>

          </ul>
        </li>
      )
    });

    return(
      <div
        ref={ (e) => { this.Block = e} }>
        { items }
      </div>
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
    changeCategoryPage: (count) => dispatch(changeCategoryPage(count))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

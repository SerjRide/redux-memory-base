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
    changeCategoryPage,
    categoryList,
    questionList } from '../../actions';

import { connect } from 'react-redux';

class List extends Component {

  state = {
    renderList: 0
  }

  componentDidMount() {
    this.renderList();
    this.synch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.renderList !== this.props.state[2]){
      this.update();
    }
  }

  update = () => {
    this.synch(this.props.state[10][1]);
    this.renderList();
    this.setState({
      renderList: this.state.renderList + 1
    })
  }

  delCategory = (id) => {
    removeCategory(id);
    const countOfPages = this.props.state[10][1]
    this.props.update();
    const obj = this.props.state[11][0];
    const nextUpdateCount = this.props.state[11][1] + 1;
    const activePage = this.props.state[11][2]
    const totalPage = this.props.state[11][3]
    this.props.changeCategoryPage([0, countOfPages])
    this.props.questionList([obj, nextUpdateCount, 0, totalPage])
    setTimeout(() => this.synch(countOfPages));
    console.log(this.props.state[10][1].length)
  };

  synch = (obj = QuestionData) => {
    this.renderList();
    const { length } = obj
    const totalPages = Math.ceil(length / 5);
    const active = this.props.state[9][0]
    this.props.changeCategoryPage([active, totalPages])
  }

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
      return item[0].name.indexOf(term) > -1;
    })
  }

  pageOutput = (items) => {
    const currentPage = this.props.state[9][0]
    const count = currentPage * 5
    return items.filter((item, i) => {
      if (i < count || i >= count + 5) return null
      return item
    });
  }

  selectCategory = (id) => {
    this.props.onSelectCategory(id)
    const currentCategory = findCountById(id)
    const obj = this.props.state[11][0];
    const nextUpdateCount = this.props.state[11][1] + 1;
    const activePage = this.props.state[11][2]
    const { length } = QuestionData[currentCategory]
    const totalPage = Math.ceil((length - 1) / 6);
    this.props.questionList([obj, nextUpdateCount, 0, totalPage])
  }

  renderList = () => {
    const term = this.props.state[7]
    let searchingItems = this.search(QuestionData, term);
    let visibleItems = this.pageOutput(searchingItems);
    const items = visibleItems.map((item, i) => {

      const { name, id } = item[0];

      return(
        <li key={ id } className="over_li">
          <ul className="under_ul">

            <li id={`category_${id}`}
              className="list-group-item item">
              <p onClick={ () => this.selectCategory(id) }>
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

    this.props.categoryList([items, searchingItems]);

  }

  render() {

    const items = this.props.state[10][0]

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
    changeCategoryPage: (num) => dispatch(changeCategoryPage(num)),
    categoryList: (items) => dispatch(categoryList(items)),
    questionList: (content) => dispatch(questionList(content))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

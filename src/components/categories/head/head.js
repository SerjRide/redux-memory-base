import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categorySearch } from '../../actions';

class Head extends Component {

  search = (e) => {
    this.props.categorySearch(e.target.value)
  }

  dateConverter = (date) => {
    let day   =  '' + date.getDate();
    let month =  '' + (date.getMonth() + 1);
    let year  = ('' + date.getFullYear()).substring(2)
    if (day.length   === 1)   day = '0' + day
    if (month.length === 1) month = '0' + month
    return `${day}.${month}.${year}`
  }

  componentDidMount() {
    let template_text = this.dateConverter(new Date())
    this.props.categorySearch(template_text)
    document.getElementById('category_search').value = template_text
  }

  render() {
    return (
      <li className="list-group-item header category">
        <p>Select a Category:</p>
        <input
          id="category_search"
          onChange={ (e) => this.search(e) }
          className="search"
          type="text"
          placeholder="search"/>
      </li>
    )
  }

};
const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    categorySearch: (text) => dispatch(categorySearch(text))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Head)

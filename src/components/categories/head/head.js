import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categorySearch } from '../../actions';

class Head extends Component {

  search = (e) => {
    this.props.categorySearch(e.target.value)
  }

  render() {
    return (
      <li className="list-group-item header category">
        <p>Select a Category:</p>
        <input
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

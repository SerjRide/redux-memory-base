import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categorySearch, update, changeCategoryPage  } from '../../actions';

class Head extends Component {

  search = (e) => {
    const { categorySearch, update, changeCategoryPage } = this.props
    changeCategoryPage([0,this.props.state[9][1]])
    categorySearch(e.target.value)
    update();
    update();
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
    categorySearch: (text) => dispatch(categorySearch(text)),
    update: () => dispatch(update()),
    changeCategoryPage: (num) => dispatch(changeCategoryPage(num))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Head)

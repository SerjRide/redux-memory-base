import React, { Component } from 'react';

export default class Head extends Component {

  render() {
    return (
      <li className="list-group-item header">
        <p>Select a Question:</p>
        <input
          className="search"
          type="text"
          placeholder="search"/>
        <button
           type="button"
           onClick={ () => console.log('new_question') }
           data-title="New Question"
           className="btn btn-secondary header">
           <i className="fas fa-plus"></i>
        </button>
      </li>
    )
  }

};

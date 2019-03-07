import React, { Component } from 'react';

export default class Head extends Component {

  render() {
    return (
      <li className="list-group-item header category">
        <p>Select a Category:</p>
        <input
          className="search"
          type="text"
          placeholder="search"/>
      </li>
    )
  }

};

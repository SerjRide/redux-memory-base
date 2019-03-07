import React, { Component } from 'react';

export default class List extends Component {

  render() {

    return(
      <React.Fragment>
        <li className="list-group-item item">Cras justo odio</li>
        <li className="list-group-item item">Dapibus ac facilisis in</li>
        <li className="list-group-item item">Morbi leo risus</li>
        <li className="list-group-item item">Porta ac consectetur ac</li>
        <li className="list-group-item item">Vestibulum at eros</li>
      </React.Fragment>
    );
  }

};

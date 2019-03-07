import React, { Component } from 'react';

export default class List extends Component {

  render() {

    return(
      <React.Fragment>
        <li
          className="list-group-item item">
          <p>Cras justo odio</p>
          <button
             type="button"
             onClick={ () => console.log('rename_category') }
             data-title="Rename Category"
             className="btn btn-secondary list">
             <i className="far fa-edit"></i>
          </button>
          <button
             type="button" onClick={ () => console.log('Delete Category') }
             data-title="Delete Category"
             className="btn btn-secondary list">
             <i className="far fa-trash-alt"></i>
          </button>
        </li>

        <li
          className="list-group-item item">
          <input type="text" className="rename"
                onKeyDown={ () => console.log('rename')}
                defaultValue="Cras justo odio" />
          <button
             type="button"
             onClick={ () => console.log('rename_category') }
             data-title="Accept"
             className="btn btn-secondary list">
             <i className="fas fa-check"></i>
          </button>
          <button
             type="button" onClick={ () => console.log('Delete Category') }
             data-title="Cancel"
             className="btn btn-secondary list">
             <i className="fas fa-times"></i>
          </button>
        </li>
      </React.Fragment>
    );
  }
};

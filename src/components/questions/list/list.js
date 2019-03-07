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
           onClick={ () => console.log('rename_question') }
           data-title="Rename Category"
           className="btn btn-secondary list">
           <i className="far fa-edit"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Delete Question') }
           data-title="Delete Category"
           className="btn btn-secondary list">
           <i className="far fa-trash-alt"></i>
        </button>
      </li>
      <li
        className="list-group-item item">
        <p>Cras justo odio</p>
        <button
           type="button"
           onClick={ () => console.log('rename_question') }
           data-title="Rename Category"
           className="btn btn-secondary list">
           <i className="far fa-edit"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Delete Question') }
           data-title="Delete Category"
           className="btn btn-secondary list">
           <i className="far fa-trash-alt"></i>
        </button>
      </li>
      <li
        className="list-group-item item">
        <p>Cras justo odio</p>
        <button
           type="button"
           onClick={ () => console.log('rename_question') }
           data-title="Rename Category"
           className="btn btn-secondary list">
           <i className="far fa-edit"></i>
        </button>
        <button
           type="button" onClick={ () => console.log('Delete Question') }
           data-title="Delete Category"
           className="btn btn-secondary list">
           <i className="far fa-trash-alt"></i>
        </button>
      </li>
      </React.Fragment>
    );
  }

};

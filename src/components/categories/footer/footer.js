import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCategoryPage } from '../../actions';

import './footer.css'

class Footer extends Component {

  componentDidMount() {
    this.synch();
  }

  synch = () => {
    const active = this.props.state[9][0];
    const arr = document.getElementsByClassName('pageButton')

    for (let i = 0; i < arr.length; i++) {
      if (active === i) {
        document.getElementsByClassName('pageButton')[i]
          .className = 'pageButton active'
      } else {
        document.getElementsByClassName('pageButton')[i]
          .className = 'pageButton'
      }
    }

    if (active > 0) {
      document.getElementById('cat-page-prev').className = 'pageNav'
    } else {
      document.getElementById('cat-page-prev').className = 'pageNav disabled'
    }

    if (active < arr.length - 1) {
      document.getElementById('cat-page-next').className = 'pageNav'
    } else {
      document.getElementById('cat-page-next').className = 'pageNav disabled'
    }

  }

  buttonsLogic = (action) => {
    const active = this.props.state[9][0];
    const arr = document.getElementsByClassName('pageButton')
    const next = document.getElementById('cat-page-next');
    const prev = document.getElementById('cat-page-prev');
    const totalPages = this.props.state[9][1]

    if (action === 'next') {
      if (next.className === 'pageNav disabled') {
        return null
      }
      this.props.changeCategoryPage([active + 1, totalPages])
    }

    if (action === 'prev') {
      if (prev.className === 'pageNav disabled') {
        return null
      }
      this.props.changeCategoryPage([active - 1, totalPages])
    }

    if (typeof(action) === 'number'){
      console.log(typeof(action))
      console.log(action)
      this.props.changeCategoryPage([action, totalPages])
    }

    setTimeout(() => this.synch());

  }

  render() {

    const totalPages = this.props.state[9][1]
    let button = [];
    for (let i = 0; i < totalPages; i++) {
      button[i] = (
        <button key={ i }
          onClick={ () => this.buttonsLogic(i) }
          className="pageButton"
          type="button">
          { i+1 }
        </button>
      )
    }

    return(
      <React.Fragment>
        <li className="list-group-item footer">
          <div>
            <button id="cat-page-prev"
              onClick={ () => this.buttonsLogic('prev') }
              className="pageNav disabled">
              Previous
            </button>
            { button }
            <button id="cat-page-next"
              onClick={ () => this.buttonsLogic('next') }
              className="pageNav">
              Next
            </button>
          </div>
        </li>
      </React.Fragment>
    );
  }

};

const mapStateToProps = (state) => ({ state: state })

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategoryPage: (num) => dispatch(changeCategoryPage(num))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

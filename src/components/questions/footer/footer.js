import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionList } from '../../actions';

import './footer.css';

class Footer extends Component {

  componentDidMount() {
    this.synch();
  }

  synch = () => {
    const active = this.props.state[11][2];
    const arr = document.getElementsByClassName('qPageButton')

    for (let i = 0; i < arr.length; i++) {
      if (active === i) {
        document.getElementsByClassName('qPageButton')[i]
          .className = 'qPageButton active'
      } else {
        document.getElementsByClassName('qPageButton')[i]
          .className = 'qPageButton'
      }
    }

    if (active > 0) {
      document.getElementById('q-page-prev').className = 'qPageNav'
    } else {
      document.getElementById('q-page-prev').className = 'qPageNav disabled'
    }

    if (active < arr.length - 1) {
      document.getElementById('q-page-next').className = 'qPageNav'
    } else {
      document.getElementById('q-page-next').className = 'qPageNav disabled'
    }

  }

  buttonsLogic = (action) => {
    const active = this.props.state[11][2];
    const next = document.getElementById('q-page-next');
    const prev = document.getElementById('q-page-prev');
    const obj = this.props.state[11][0];
    const update = this.props.state[11][1] + 1;
    const totalPages = this.props.state[11][3];

    if (action === 'next') {
      if (next.className === 'qPageNav disabled') {
        return null
      }
      const activePage = this.props.state[11][2] + 1;
      this.props.questionList([obj, update, activePage, totalPages])
    }

    if (action === 'prev') {
      if (prev.className === 'qPageNav disabled') {
        return null
      }
      const activePage = this.props.state[11][2] - 1;
      this.props.questionList([obj, update, activePage, totalPages])
    }

    if (typeof(action) === 'number'){
      console.log(typeof(action))
      console.log(action)
      this.props.questionList([obj, update, action, totalPages])
    }

    setTimeout(() => this.synch());

  }

  render() {
    const totalPages = this.props.state[11][3]
    let button = [];
    for (let i = 0; i < totalPages; i++) {
      button[i] = (
        <button key={ i }
          onClick={ () => this.buttonsLogic(i) }
          className="qPageButton"
          type="button">
          { i+1 }
        </button>
      )
    }

    return(
      <React.Fragment>
        <li className="list-group-item footer">
          <div>
            <button id="q-page-prev"
              onClick={ () => this.buttonsLogic('prev') }
              className="qPageNav disabled">
              Previous
            </button>
            { button }
            <button id="q-page-next"
              onClick={ () => this.buttonsLogic('next') }
              className="qPageNav">
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
    questionList: (content) => dispatch(questionList(content))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

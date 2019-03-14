import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirm } from '../actions'

import './confirm.css';

class Confirm extends Component {

  keyEsc = (e) => {
    if (e.key === 'Escape') {
      this.modalClose();
    }
  }

  modalOpen = () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('yes_modal');
    modal.style.display = "flex";
    btn.focus();
  }

  modalContent = (e) => {
    const { id } = e.target
    if (id !== 'modal_message') {
      if (id === 'yes_modal') this.modalAccept()
      this.modalClose()
    }
  }

  modalAccept = () => {
    const func = this.props.state[9][1]
    func(this.props.state[9][2])
    this.modalClose()
  }

  modalClose = () => {
    const modal = document.getElementById('myModal');
    this.props.confirm('');
    modal.style.display = "none";
  }

  render() {
    const text = this.props.state[9][0]
    if (text !== '') this.modalOpen()

    return(
        <div id="myModal"
          className="modal"
          onClick={ (e) => this.modalContent(e) }>
          <div className="modal-content">
            <p id="modal_message" className="under-modal"> { text }</p>
            <button id="yes_modal"
              onKeyDown={ (e) => this.keyEsc(e) }
              className="btn under-modal red">
              Yes
            </button>
            <button id="close_modal"
              className="btn under-modal">
              Cancel
            </button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    confirm: (text) => dispatch(confirm(text))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

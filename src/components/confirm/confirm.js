import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirm, update } from '../actions'

import { findNameByStringDate } from '../../service/question-data.js';

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
    if (!e.target.hasAttribute('hold')) {
      if (id === 'yes_modal') this.modalAccept()
      this.modalClose()
    }
  }

  modalAccept = () => {
    const func = this.props.state[9][0]
    func(this.props.state[9][1])
    this.modalClose()
  }

  modalClose = () => {
    const modal = document.getElementById('myModal');
    this.props.confirm();
    modal.style.display = "none";
  }

  dateRecomender = (name) => {
    let first  = name.split(' - ')[0]
    let second = name.split(' - ')[1]
    let firstStamp = this.dateConverter(first)
    let secondStamp = this.dateConverter(second)
    let difference = secondStamp - firstStamp
    let dayPass = this.dateConverter(difference)
    let recomend = this.dateConverter(new Date(secondStamp + difference + 172800000))
    return {pass: dayPass, recomend: recomend}
  }

  dateConverter = (date, stamp = 0) => {
    if (typeof(date) === 'number') {
      let seconds = date / 1000
      let minutes = seconds / 60
      let hours = minutes / 60
      let days = (hours / 24) - 1
      return days
    }

    if (typeof(date) === 'string') {
      let day = +date.substring(0, 2)
      let month = +date.substring(3, 5)
      let year = +('20' + date.substring(6))
      let timestamp = (new Date(year, month - 1, day)).getTime()
      return timestamp
    }

    if (typeof(date) === 'object') {
      let day   =  '' + date.getDate();
      let month =  '' + (date.getMonth() + 1);
      let year  = ('' + date.getFullYear()).substring(2)
      if (day.length   === 1)   day = '0' + day
      if (month.length === 1) month = '0' + month
      return `${day}.${month}.${year}`
    }
  }

  componentDidUpdate() {
    let categry_message = ''
    let new_name = this.props.state[9][4]
    let name = this.props.state[9][3]
    if (new_name === '') {

      //let second_date = name.split(' - ')[1]
      let recomendDate =
        this.dateConverter(new Date()) + ' - ' +
        this.dateRecomender(name).recomend

      if (name !== '') {
        setTimeout(() => {

            document.getElementById('modal_input').value = recomendDate
            categry_message = `Списков в этот день: ${ this.categoryDetector(recomendDate) }`
            document.getElementById('category_message').innerText = categry_message

          },100)
      }

    } else {
      setTimeout(() => {

          document.getElementById('modal_input').value = new_name
          categry_message = `Списков в этот день: ${ this.categoryDetector(new_name) }`
          document.getElementById('category_message').innerText = categry_message

        },100)
    }

  }

  changeDate = (btn) => {
    let name = ''
    if (!this.props.state[9][4]) {
      name = document.getElementById('modal_input').value
    } else {
      name = this.props.state[9][4]
    }
    let second_date = name.split(' - ')[1]
    let timestamp = this.dateConverter(second_date);
    let today = this.dateConverter(new Date())

    const local_convert = (type) => {
      //let first_click = this.props.state[9][4] == ''
      let full_date = ''

      if (type === 'next') {

        full_date = new Date(timestamp + 86400000).toLocaleString()
                                                      .split(', ')[0]
      }

      if (type === 'prev') {

        full_date = new Date(timestamp - 86400000).toLocaleString()
                                                      .split(', ')[0]
      }

      let split_str = full_date.split('.')
      let day   = '' + split_str[0]
      let month = '' + (+split_str[1])
      //if (first_click) month = '' + (+split_str[1] + 1)
      let year  = split_str[2].substring(2)
      if (day.length   === 1)   day = '0' + day
      if (month.length === 1) month = '0' + month
      return `${day}.${month}.${year}`

    }

    if (btn === 'up') {
      let next_day = local_convert('next')
      this.props.state[9][4] = `${today} - ${next_day}`
    }

    if (btn === 'down') {
      let prev_day = local_convert('prev')
      this.props.state[9][4] = `${today} - ${prev_day}`
    }
    this.props.update()
  }

  categoryDetector = (date) => {
    let research_date = date.split(' - ')[1]
    return findNameByStringDate(research_date)
  }

  render() {
    const type = this.props.state[9][2]
    const name = this.props.state[9][3]

    let text = ''
    let fill = null

    if (type === 'done') {
      text = `прошло дней с момента повторения:
                ${this.dateRecomender(name).pass}`
      fill = (
        <React.Fragment>
          <p hold="true" id="modal_message" className="under-modal">
            { text }
          </p>
          <p hold="true" id="category_message" className="under-modal"></p>
          <div hold="true" id="modul_row" className='row'>
            <div hold="true" className="col-lg-12">
              <div hold="true" className="col-lg-6 my">
                <input
                  hold="true"
                  className="input-group-text"
                  id="modal_input" type="text"
                />
                <div hold="true" className="modal_btn_group">
                  <button hold="true" type="button" className="modul_btn"
                    onClick={ () => this.changeDate('up') }>
                    <i hold="true" className="fa fa-angle-up" aria-hidden="true"></i>
                  </button>
                  <button hold="true" type="button" className="modul_btn"
                    onClick={ () => this.changeDate('down') }>
                    <i hold="true" className="fa fa-angle-down" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }

    if (type === 'del_question') {
      text = `Вы действительно хотите удалить этот вопрос?`
      fill = <p id="modal_message" className="under-modal"> { text }</p>
    }

    if (type === 'del_category') {
      text = `Вы действительно
              хотите безвозвратно удалить эту категорию вопросов?`
      fill = <p id="modal_message" className="under-modal"> { text }</p>
    }

    if (text !== '') this.modalOpen()

    return(
        <div id="myModal"
          className="modal"
          onClick={ (e) => this.modalContent(e) }>
          <div hold="true" className="modal-content">
            { fill }
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
    update: () => dispatch(update()),
    confirm: (func, id, type, name, new_name) => {
      return dispatch(confirm(func, id, type, name, new_name))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

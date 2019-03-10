import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update, changeCategoryPage } from '../../actions';

import './footer.css';

class Footer extends Component {

  selectPage = (e) => {
    const selectPage = Number(e.target.value);
    this.props.changeCategoryPage([this.props.state[9][0], selectPage]);
    this.props.update();
    console.log('Отображать страницы с', selectPage, 'записи')
  }

  // buttonsRender = () => {
  //   const countPages = this.props.state[9][0]
  //   let value = 0, name = 1, buttons
  //   for (let i = 0; i <= countPages; i++) {
  //     value += 5
  //     name++
  //     buttons = (
  //       <React.Fragment>
  //         <input
  //           onClick={ (e) => this.selectPage(e) }
  //           name="page"
  //           type="radio"
  //           value={ value }/> { name }
  //       </React.Fragment>
  //     )
  //     console.log(buttons)
  //   }
  //   return buttons
  // }

  render() {
    const pages = this.props.state[9][0];
    const countPages = this.props.state[9][0]
    let value = 0, name = 1, button = [];

    for (let i = 0; i < countPages; i++) {
      button[i] = (
        <label key={ i }>
          <input
            className="myradio"
            onClick={ (e) => this.selectPage(e) }
            name="page"
            type="radio"
            value={ value }/>
            <span></span>
            <p>{ name }</p>
        </label>
      )
      value += 5
      name++
      console.log(button)
    }

    return(
      <React.Fragment>
        <li className="list-group-item footer">
          <ul className="pages_ul">
            { button }
          </ul>
        </li>
      </React.Fragment>
    );
  }

};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{
    update: () => dispatch(update()),
    changeCategoryPage: (count) => dispatch(changeCategoryPage(count))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

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

  render() {
    const pages = this.props.state[9][0];
    const countPages = this.props.state[9][0]
    let value = 0, name = 1, button = [];

    if (countPages === 1) button = null
    if (countPages > 1) {
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
      }
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

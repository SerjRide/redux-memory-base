import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alert } from '../actions';

import './alert.css'

class Alert extends Component {

  render() {

    setTimeout( () => this.props.alert(null), 2000 );

    let type = this.props.state[6] ? "success" : "danger"

    return(
      <div className={ `alert alert-${type}` }>
        { this.props.state[5] }
      </div>
    )

  }
};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{ alert: (text) => dispatch(alert(text)) }
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);

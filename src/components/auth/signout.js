import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignOut extends Component {
  componentWillMount(){
    this.props.signOutUser();
  }

  render(){
    return(
      <div>The Dude abides...</div>
    );
  }
}

export default connect(null, actions)(SignOut);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Feature extends Component {

  componentWillMount(){
    this.props.fetchMessage();
  }

  render(){
    return (
      <div>
        <h4>Creature Feature</h4>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

function mapStateToProps({ message }){
  return { message };
}

export default connect(mapStateToProps, actions)(Feature);
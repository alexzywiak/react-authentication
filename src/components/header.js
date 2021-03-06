import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions';

class Header extends Component {

  renderLinks(){
    if(this.props.authenticated){
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    } else {
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
      ];
    }
  }

  render(){
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ auth }){
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
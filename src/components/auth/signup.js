import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {

  handleFormSubmit({ email, password }){
    this.props.signUpUser({ email, password });
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> <em>{this.props.errorMessage}</em>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} type="text" className="form-control"/>
        </fieldset>
        {email.touched && email.error && <div className="error">{email.error}</div>}
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control"/>
        </fieldset>
        {password.touched && password.error && <div className="error">{password.error}</div>}
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control"/>
        </fieldset>
        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  for(let prop in formProps){
    if(!formProps[prop]){
      errors[prop] = `Must provide a ${prop}`;
    }
  }

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error }; 
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(SignUp);
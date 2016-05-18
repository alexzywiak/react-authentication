import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'; 

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password }){
  return function(dispatch){
    // Submit Email/Password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      console.log(response);
        // If Good: 
        // - update state
        dispatch({ type: AUTH_USER });
        // - save JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to /feature route
        browserHistory.push('/feature');
      })
    .catch(() => {
        // If Bad:
        // - Show an error to the user
        dispatch(authError('Blew it Bro!'));
      });
    
  }
}

export function signUpUser({ email, password }){
  return function(dispatch){
    // Submit Email/Password to server
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      console.log(response);
        // If Good: 
        // - update state
        dispatch({ type: AUTH_USER });
        // - save JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to /feature route
        browserHistory.push('/feature');
      })
    .catch(response => dispatch(authError(response.data.error)));
    
  }
}

export function signOutUser(){

  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage(){
  return function(dispatch){

    axios.get(ROOT_URL, {headers: {
      authorization: localStorage.getItem('token')
    }})
    .then(response => {
      dispatch({type: FETCH_MESSAGE, payload: response.data.message});
    });
  }
}

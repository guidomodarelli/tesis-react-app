import api from '../../api';
import { ERROR, LOADING, SIGN_OUT, SIGN_IN, RESTORE_TOKEN } from '../types';

export const signIn = (user) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const data = await api.post.signIn(user);
    let token = null;
    if (data) {
      token = data.token;
    }
    dispatch({
      type: SIGN_IN,
      payload: token,
    });
    localStorage.setItem('token', token);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
    localStorage.removeItem('token');
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: LOADING });
  try {
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem('token');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const signUp = (user) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const data = await api.post.signUp(user);
    dispatch({
      type: SIGN_IN,
      payload: data.token,
    });
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
    localStorage.removeItem('token');
  }
};

export const restoreToken = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const data = await api.get.loggedIn();
  let userToken = null;
  if (data.loggedIn) {
    userToken = localStorage.getItem('token');
  }
  dispatch({ type: RESTORE_TOKEN, payload: userToken });
};

import api from '../../api';
import {
  AUTH_FAIL,
  ERROR,
  LOADING,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SING_UP,
} from '../types';
import { SET_CURRENT_USER } from '../types/usersTypes';

export const signIn = (user) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const data = await api.post.signIn(user);
    let token = null;
    let userData = null;
    if (data) {
      if (data.message) {
        dispatch({
          type: AUTH_FAIL,
          payload: data.message,
        });
      } else {
        ({ token } = data);
        ({ user: userData } = data);
        dispatch({
          type: SET_CURRENT_USER,
          payload: userData,
        });
        dispatch({
          type: SIGN_IN,
          payload: token,
        });
        localStorage.setItem('token', token);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
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
    await api.post.signUp(user);
    dispatch({
      type: SING_UP,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const restoreToken = () => async (dispatch, getState) => {
  dispatch({ type: LOADING });
  try {
    let data = await api.get.loggedIn();
    let userToken = null;
    if (data && data.loggedIn) {
      userToken = localStorage.getItem('token');
      data = await api.get.users.myProfile();
      dispatch({ type: SET_CURRENT_USER, payload: data });
    }
    dispatch({ type: RESTORE_TOKEN, payload: userToken });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
    localStorage.removeItem('token');
  }
};

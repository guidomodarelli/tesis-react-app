import axios from '../../config';
import User from '../../classes/User';
import {
  ERROR,
  LOADING,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  MESSAGE_ERRORS,
  SING_UP,
} from '../types';
import { SET_CURRENT_USER, UPLOADING, USER_LOADING } from '../types/usersTypes';
import { filterNonNull } from '../../utils';

export function catchError(error, dispatch, type = ERROR) {
  console.error(error);
  if (error.isAxiosError && error.response && error.response.status !== 500) {
    const { response } = error;
    const { data } = response;
    const { errors } = data;
    dispatch({
      type: MESSAGE_ERRORS,
      payload: errors,
    });
  } else {
    dispatch({
      type,
      payload: error,
    });
  }
}

export const resetMessageErrors = () => (dispatch) => {
  dispatch({ type: MESSAGE_ERRORS, payload: [] });
};

export const signIn = (form) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const {
      data: { token, user },
    } = await axios.post('/login', form);
    dispatch({ type: SET_CURRENT_USER, payload: new User(user) });
    dispatch({ type: SIGN_IN, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    catchError(error, dispatch);
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem('token');
  } catch (error) {
    catchError(error, dispatch);
  }
};

export const signUp = (form, history) => async (dispatch) => {
  dispatch({ type: UPLOADING, payload: true });
  try {
    await axios.post('/signup', filterNonNull(form));
    dispatch({ type: SING_UP });
    dispatch({ type: UPLOADING, payload: false });
    history.push('/login');
  } catch (error) {
    catchError(error, dispatch);
  }
};

export const restoreToken = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const { data } = await axios.get('/current/user');
    const token = localStorage.getItem('token');
    const user = new User(data.user);
    dispatch({ type: SET_CURRENT_USER, payload: user });
    dispatch({ type: RESTORE_TOKEN, payload: token });
  } catch (error) {
    dispatch({ type: USER_LOADING, payload: false });
    dispatch({ type: LOADING, payload: false });
    console.error(error);
    if (error.isAxiosError && error.response && error.response.status === 500) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
    localStorage.removeItem('token');
  }
};

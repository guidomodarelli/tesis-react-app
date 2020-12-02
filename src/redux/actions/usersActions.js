import api from '../../server/api';
import {
  GET_USERS,
  USER_ERROR,
  USER_LOADING,
  USER_LOGGED_IN,
} from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const payload = await api.get.users.list();
    dispatch({
      type: GET_USERS,
      payload,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: USER_ERROR,
      payload: error.message,
    });
  }
};

export const isLoggedIn = () => async (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const data = await api.get.loggedIn();
    dispatch({ type: USER_LOADING, payload: false });
    return data.loggedIn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: USER_ERROR,
      payload: error.message,
    });
    return false;
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const data = await api.post.login(user);
    dispatch({
      type: USER_LOGGED_IN,
      payload: !!data.token,
    });
    localStorage.setItem('token', data.token);
    return !!data.token;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: USER_ERROR,
      payload: error.message,
    });
    localStorage.removeItem('token');
    return false;
  }
};

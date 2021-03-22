import axios from '../../config';
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

/**
 *
 * @typedef {import("redux").Dispatch} Dispatch
 * @typedef {import("../reducers/usersReducer").UserForm} UserForm
 * @typedef {import("../reducers").GlobalState} GlobalState
 */

/**
 *
 * @param {import("axios").AxiosError | Error} error
 * @param {Dispatch} dispatch
 * @param {string} type
 * @param {string} axiosType
 */
export function catchError(
  error,
  dispatch,
  type = ERROR,
  axiosType = MESSAGE_ERRORS,
) {
  console.error(error);
  if (error.isAxiosError && error.response && error.response.status !== 500) {
    const { response } = error;
    const { data } = response;
    const { errors } = data;
    dispatch({
      type: axiosType,
      payload: errors,
    });
  } else {
    dispatch({
      type,
      payload: error,
    });
  }
}

/**
 * @typedef {(dispatch: Dispatch, getState: ?GlobalState) => Promise<void>} callbackDispatch
 *
 * @typedef {Object} DispatchsReducer
 * @property {resetMessageErrors} resetMessageErrors
 * @property {signIn} signIn
 * @property {signOut} signOut
 * @property {signUp} signUp
 * @property {restoreToken} restoreToken
 *
 * @typedef {import("./pubsActions").DispatchsPubsReducer} DispatchsPubsReducer
 * @typedef {import("./usersActions").DispatchsUsersReducer} DispatchsUsersReducer
 *
 * @typedef {DispatchsReducer & DispatchsPubsReducer & DispatchsUsersReducer} GlobalDispatchs
 */

/**
 *
 * @returns {callbackDispatch}
 */
export const resetMessageErrors = () => (dispatch) => {
  dispatch({ type: MESSAGE_ERRORS, payload: [] });
};

/**
 *
 * @param {UserForm} form
 * @returns {callbackDispatch}
 */
export const signIn = (form) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const {
      data: { token, user },
    } = await axios.post('/login', form);
    dispatch({ type: SET_CURRENT_USER, payload: user });
    dispatch({ type: SIGN_IN, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    catchError(error, dispatch);
  }
};

/**
 *
 * @returns {callbackDispatch}
 */
export const signOut = () => (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem('token');
  } catch (error) {
    catchError(error, dispatch);
  }
};

/**
 *
 * @param {UserForm} form
 * @param {unknown[]} history
 * @returns {callbackDispatch}
 */
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

/**
 *
 * @returns {callbackDispatch}
 */
export const restoreToken = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get('/current/user');
    /** @type {import('../reducers/usersReducer').User} */
    const userObj = response.data.user;
    const token = localStorage.getItem('token');
    dispatch({ type: SET_CURRENT_USER, payload: userObj });
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

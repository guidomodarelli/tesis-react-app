import { catchError } from '.';
import axios from '../../config';
import { filterNonNull, toTitleCase } from '../../utils';
import { MESSAGE_ERRORS } from '../types';
import {
  DELETE_USER,
  GET_USERS,
  PUT_ADMIN_PERMISSIONS,
  PUT_USER,
  RESET_FORM,
  SET_FORM,
  USER_ERROR,
  USER_LOADING,
} from '../types/usersTypes';

/**
 *
 * @typedef {import('../reducers/usersReducer').UserForm} UserForm
 * @typedef {import(".").callbackDispatch} callbackDispatch
 *
 * @typedef {Object} DispatchsUsersReducer
 * @property {handleChangeForm} handleChangeForm
 * @property {resetForm} resetForm
 * @property {getAll} getAll
 * @property {putUser} putUser
 * @property {putAdminPermissions} putAdminPermissions
 * @property {deleteUser} deleteUser
 */

/**
 *
 * @param {UserForm} form
 * @returns {callbackDispatch}
 */
export const handleChangeForm = (form) => (dispatch) => {
  /** @type {UserForm} */
  const newForm = {
    ...form,
    name: toTitleCase(form.name),
    bio: form.bio || '',
    instagram: form.instagram || '',
    password: form.password || '',
  };
  dispatch({ type: SET_FORM, payload: newForm });
};

/**
 *
 * @returns {callbackDispatch}
 */
export const resetForm = () => (dispatch) => {
  dispatch({ type: RESET_FORM });
};

/**
 *
 * @returns {callbackDispatch}
 */
export const getAll = () => async (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const { data: users } = await axios.get('/users');
    dispatch({ type: GET_USERS, payload: users });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

/**
 *
 * @param {string} userId
 * @param {unknown[]} history
 * @returns {callbackDispatch}
 */
export const putUser = (userId, history) => async (dispatch, getState) => {
  const { form: userFrom } = getState().usersReducer;
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const form = filterNonNull(userFrom);
    await axios.put(`/users/${userId}`, form);
    dispatch({ type: PUT_USER, payload: form });
    dispatch({ type: MESSAGE_ERRORS, payload: [] });
    history.push(`/users/${userId}`);
  } catch (error) {
    catchError(error, dispatch, USER_ERROR);
  }
};

/**
 *
 * @param {string} userId
 * @returns {callbackDispatch}
 */
export const putAdminPermissions = (userId) => async (dispatch, getState) => {
  const { form: userFrom } = getState().usersReducer;
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const form = filterNonNull(userFrom);
    if (form.role === 'normal') {
      form.role = 'admin';
    }
    await axios.put(`/users/${userId}`, form);
    dispatch({ type: PUT_ADMIN_PERMISSIONS, payload: form, userId });
  } catch (error) {
    catchError(error, dispatch, USER_ERROR);
  }
};

/**
 *
 * @param {string} userId
 * @returns {callbackDispatch}
 */
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING, payload: true });
  const { currentUser } = getState().usersReducer;
  try {
    await axios.delete(`/users/${userId}`);
    if (currentUser && currentUser.id === userId) {
      localStorage.removeItem('token');
    }
    dispatch({ type: DELETE_USER, id: userId });
  } catch (error) {
    catchError(error, dispatch, USER_ERROR);
  }
};

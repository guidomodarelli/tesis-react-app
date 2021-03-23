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
 *
 * @typedef {import(".").callbackDispatch} callbackDispatch
 *
 * @typedef {Object} DispatchsUsersReducer
 * @property {handleChangeUserForm} handleChangeUserForm
 * @property {resetUserForm} resetUserForm
 * @property {getUsers} getUsers
 * @property {putUser} putUser
 * @property {putAdminPermissions} putAdminPermissions
 * @property {deleteUser} deleteUser
 */

/**
 *
 * @param {UserForm} form
 * @returns {callbackDispatch}
 */
export const handleChangeUserForm = (form) => (dispatch) => {
  /** @type {UserForm} */
  const newForm = {
    ...form,
    name: toTitleCase(form.name),
    bio: form.bio || '',
    instagram: form.instagram || '',
    password: form.password || '',
  };
  dispatch({ type: SET_FORM, form: newForm });
};

/**
 *
 * @returns {callbackDispatch}
 */
export const resetUserForm = () => (dispatch) => {
  dispatch({ type: RESET_FORM });
};

/**
 *
 * @returns {callbackDispatch}
 */
export const getUsers = () => async (dispatch) => {
  dispatch({ type: USER_LOADING, loading: true });
  try {
    const { data: users } = await axios.get('/users');
    dispatch({ type: GET_USERS, newUsers: users });
  } catch (error) {
    catchError(error, dispatch, USER_ERROR);
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
  dispatch({ type: USER_LOADING, loading: true });
  try {
    const form = filterNonNull(userFrom);
    await axios.put(`/users/${userId}`, form);
    dispatch({ type: PUT_USER, form });
    dispatch({ type: MESSAGE_ERRORS, messageErrors: [] });
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
  dispatch({ type: USER_LOADING, loading: true });
  try {
    const form = filterNonNull(userFrom);
    if (form.role === 'normal') {
      form.role = 'admin';
    }
    await axios.put(`/users/${userId}`, form);
    dispatch({ type: PUT_ADMIN_PERMISSIONS, form, userId });
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
  dispatch({ type: USER_LOADING, loading: true });
  const { currentUser } = getState().usersReducer;
  try {
    await axios.delete(`/users/${userId}`);
    if (currentUser && currentUser.id === userId) {
      localStorage.removeItem('token');
    }
    dispatch({ type: DELETE_USER, userId });
  } catch (error) {
    catchError(error, dispatch, USER_ERROR);
  }
};

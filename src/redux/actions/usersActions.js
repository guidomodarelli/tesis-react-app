import axios from '../../config';
import User from '../../classes/User';
import { filterNonNull, toTitleCase } from '../../utils';
import {
  DELETE_USER,
  GET_USERS,
  PUT_USER,
  PUT_OTHER_USER,
  RESET_FORM,
  SET_FORM,
  USER_ERROR,
  USER_LOADING,
} from '../types/usersTypes';
import { MESSAGE_ERRORS } from '../types';

export const handleChangeForm = (form) => (dispatch) => {
  const newForm = {
    ...form,
    name: toTitleCase(form.name),
    bio: form.bio || '',
    instagram: form.instagram || '',
    password: form.password || '',
  };
  dispatch({ type: SET_FORM, payload: newForm });
};

export const resetForm = () => (dispatch) => {
  dispatch({ type: RESET_FORM });
};

export const getAll = () => async (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const { data: users } = await axios.get('/users');
    dispatch({ type: GET_USERS, payload: users.map((user) => new User(user)) });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

export const putUser = (id) => async (dispatch, getState) => {
  const { form: userFrom } = getState().usersReducer;
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const form = new User(filterNonNull(userFrom));
    await axios.put(`/users/${id}`, form);
    dispatch({ type: PUT_USER, payload: form });
    dispatch({ type: MESSAGE_ERRORS, payload: [] });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

export const putOtherUser = (userId) => async (dispatch, getState) => {
  const { form } = getState().usersReducer;
  dispatch({ type: USER_LOADING, payload: true });
  try {
    const formNonNull = filterNonNull(form);
    formNonNull.role = 'admin';
    await axios.put(`/users/${userId}`, formNonNull);
    dispatch({ type: PUT_OTHER_USER, payload: formNonNull, userId });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

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
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

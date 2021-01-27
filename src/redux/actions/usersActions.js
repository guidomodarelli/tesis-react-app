import api from '../../api';
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

export const handleChangeForm = (form) => (dispatch) => {
  dispatch({ type: SET_FORM, payload: form });
};

export const resetForm = () => (dispatch) => {
  dispatch({ type: RESET_FORM });
};

export const getAll = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const payload = await api.get.users.list();
    dispatch({ type: GET_USERS, payload });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

const deleteEmptyFields = (originalForm) => {
  const form = { ...originalForm };
  const entries = Object.entries(form);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (!value) delete form[key];
  }
  return form;
};

export const putUser = (userId) => async (dispatch, getState) => {
  const { form } = getState().usersReducer;
  dispatch({ type: USER_LOADING });
  try {
    const newForm = deleteEmptyFields(form);
    await api.put.users.update(userId, newForm);
    dispatch({ type: PUT_USER, payload: newForm });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

export const putOtherUser = (userId) => async (dispatch, getState) => {
  const { form } = getState().usersReducer;
  dispatch({ type: USER_LOADING });
  try {
    const newForm = deleteEmptyFields(form);
    newForm.role = 'admin';
    await api.put.users.update(userId, newForm);
    dispatch({ type: PUT_OTHER_USER, payload: newForm, userId });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const { currentUser } = getState().usersReducer;
  try {
    await api.delete.users.remove(userId);
    if (currentUser && currentUser.id === userId) {
      localStorage.removeItem('token');
    }
    dispatch({ type: DELETE_USER, id: userId });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({ type: USER_ERROR, payload: error.message });
  }
};

import api from '../../api';
import {
  DELETE_USER,
  GET_USERS,
  PUT_USER,
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

export const putUser = (userId) => async (dispatch, getState) => {
  const { form } = getState().usersReducer;
  dispatch({ type: USER_LOADING });
  try {
    const newForm = { ...form };
    if (!newForm.password) delete newForm.password;
    await api.put.users.update(userId, newForm);
    dispatch({
      type: PUT_USER,
      payload: newForm,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: USER_ERROR,
      payload: error.message,
    });
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
    dispatch({
      type: USER_ERROR,
      payload: error.message,
    });
  }
};

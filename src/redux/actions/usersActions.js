import api from '../../api';
import {
  DELETE_USER,
  GET_USERS,
  USER_ERROR,
  USER_LOADING,
} from '../types/usersTypes';

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

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const { currentUser } = getState().reducer;
  try {
    await api.delete.users.remove(userId);
    if (currentUser.id === userId) {
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

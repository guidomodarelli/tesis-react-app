import api from '../../api';
import {
  GET_USERS,
  USER_ERROR,
  USER_LOADING,
} from '../types/usersTypes';

// eslint-disable-next-line import/prefer-default-export
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

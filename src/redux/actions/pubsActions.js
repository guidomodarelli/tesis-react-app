import { catchError } from '.';
import axios from '../../config';
import {
  GET_PUBS,
  POST_PUBS,
  PUBS_CHANGE_FORM,
  PUBS_ERROR,
  PUBS_LOADING,
  PUBS_MESSAGE_ERRORS,
  PUBS_UPLOADING,
} from '../types/pubsTypes';

// eslint-disable-next-line import/prefer-default-export
export const getAllPubs = () => async (dispatch) => {
  try {
    dispatch({ type: PUBS_LOADING });
    const { data } = await axios.get('/pubs');
    dispatch({ type: GET_PUBS, payload: data.results });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

export const handleChangeFormPub = (form) => (dispatch) => {
  try {
    dispatch({ type: PUBS_CHANGE_FORM, payload: form });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

export const postPub = () => async (dispatch, getState) => {
  const { form } = getState().pubsReducer;
  const { currentUser } = getState().usersReducer;
  try {
    dispatch({ type: PUBS_UPLOADING });
    const { data } = await axios.post(`/pubs/${currentUser.id}`, form);
    dispatch({ type: POST_PUBS, payload: data });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR, PUBS_MESSAGE_ERRORS);
  }
};

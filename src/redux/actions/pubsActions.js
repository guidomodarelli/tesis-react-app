import { catchError } from '.';
import axios from '../../config';
import {
  GET_PUBS,
  GET_NEXT_PUBS,
  LIKE_PUB,
  POST_PUBS,
  PUBS_CHANGE_FORM,
  PUBS_ERROR,
  PUBS_LOADING,
  PUBS_MESSAGE_ERRORS,
  PUBS_UPLOADING,
  UNLIKE_PUB,
} from '../types/pubsTypes';

/**
 * @typedef {import("redux").Dispatch} Dispatch
 * @typedef {import("../reducers/pubsReducer").PubForm} PubForm
 */

/**
 *
 * @returns {(dispatch: Dispatch) => Promise<void>}
 */
export const getAllPubs = () => async (dispatch) => {
  try {
    dispatch({ type: PUBS_LOADING });
    const { data } = await axios.get('/pubs');
    dispatch({
      type: GET_PUBS,
      payload: data.results,
      page: 1,
      pages: data.info.pages,
    });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

/**
 *
 * @returns {(dispatch: Dispatch) => Promise<void>}
 */
export const getNextPage = () => async (dispatch, getState) => {
  const {
    pubsReducer: { page },
  } = getState();
  try {
    const newPage = page + 1;
    dispatch({ type: PUBS_LOADING });
    const { data } = await axios.get('/pubs', {
      params: {
        page: newPage,
      },
    });
    dispatch({
      type: GET_NEXT_PUBS,
      payload: data.results,
      page: newPage,
      pages: data.info.pages,
    });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

/**
 *
 * @param {PubForm} form
 * @returns {(dispatch: Dispatch) => Promise<void>}
 */
export const handleChangeFormPub = (form) => (dispatch) => {
  try {
    dispatch({ type: PUBS_CHANGE_FORM, payload: form });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

/**
 *
 * @returns {(dispatch: Dispatch, getState: function(): {}) => Promise<void>}
 */
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

/**
 *
 * @param {number} pubId
 * @param {boolean} fav
 * @returns {(dispatch: Dispatch) => Promise<void>}
 */
export const toggleFavPub = (pubId, fav) => async (dispatch, getState) => {
  const {
    currentUser: { id: userId },
  } = getState().usersReducer;
  try {
    if (!fav) {
      await axios.post(`/pubs/fav/${pubId}`, { userId });
      dispatch({ type: LIKE_PUB, pubId, userId });
    } else {
      await axios.delete(`/pubs/fav/${pubId}`, {
        data: {
          userId,
        },
      });
      dispatch({ type: UNLIKE_PUB, pubId, userId });
    }
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR, PUBS_MESSAGE_ERRORS);
  }
};

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
 * @typedef {import("../reducers/pubsReducer").PubForm} PubForm
 *
 * @typedef {import("../reducers/pubsReducer").Publication} Publication
 *
 * @typedef {import(".").callbackDispatch} callbackDispatch
 *
 * @typedef {{
 *  data: {
 *    info: {
 *      count: number;
 *      pages: number;
 *      next: string;
 *      prev: string;
 *    };
 *    results: Publication[];
 *  };
 * }} Data
 *
 * @typedef {Object} DispatchsPubsReducer
 * @property {getPubs} getPubs
 * @property {getPubsNextPage} getPubsNextPage
 * @property {handleChangePubForm} handleChangePubForm
 * @property {postPub} postPub
 * @property {toggleFavPub} toggleFavPub
 * @property {emptyMessageErrors} emptyMessageErrors
 */

/**
 *
 * @returns {callbackDispatch}
 */
export const getPubs = () => async (dispatch) => {
  try {
    dispatch({ type: PUBS_LOADING });
    /** @type {Data} */
    const { data } = await axios.get('/pubs');
    dispatch({
      type: GET_PUBS,
      newPubs: data.results,
      page: 1,
      pages: data.info.pages,
    });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

/**
 *
 * @returns {callbackDispatch}
 */
export const getPubsNextPage = () => async (dispatch, getState) => {
  /**
   * @type {{
   *  pubsReducer: {
   *    page: number;
   *  };
   * }}
   */
  const {
    pubsReducer: { page },
  } = getState();
  try {
    const newPage = page + 1;
    dispatch({ type: PUBS_LOADING });

    /** @type {Data} */
    const { data } = await axios.get('/pubs', {
      params: {
        page: newPage,
      },
    });
    dispatch({
      type: GET_NEXT_PUBS,
      newPubs: data.results,
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
 * @returns {callbackDispatch}
 */
export const handleChangePubForm = (form) => (dispatch) => {
  try {
    dispatch({ type: PUBS_CHANGE_FORM, form });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

/**
 *
 * @returns {callbackDispatch}
 */
export const postPub = () => async (dispatch, getState) => {
  const {
    pubsReducer: { form },
  } = getState();
  try {
    dispatch({ type: PUBS_UPLOADING });
    /** @type {Data} */
    const { data } = await axios.post('/pubs', form);
    dispatch({ type: POST_PUBS, newPub: data });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR, PUBS_MESSAGE_ERRORS);
  }
};

/**
 *
 * @param {number} pubId
 * @param {boolean} fav
 * @returns {callbackDispatch}
 */
export const toggleFavPub = (pubId, fav) => async (dispatch, getState) => {
  const {
    usersReducer: {
      currentUser: { id: userId },
    },
  } = getState();
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

/**
 *
 * @returns {callbackDispatch}
 */
export const emptyMessageErrors = () => (dispatch) => {
  dispatch({ type: PUBS_MESSAGE_ERRORS, messageErrors: [] });
};

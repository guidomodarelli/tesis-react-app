import { catchError } from '.';
import axiosInstance from '../../config/axios';
import {
  CHAT_ADD_MESSAGE,
  CHAT_ERROR,
  CHAT_GET_MESSAGES,
  CHAT_LOADING,
} from '../types/chatTypes';

/**
 * @typedef {import("./pubsActions").callbackDispatch} callbackDispatch
 * @typedef {import("../reducers/chatReducer").StateChatReducer} StateChatReducer
 */

/**
 *
 * @param {string} tag
 * @returns {callbackDispatch}
 */
export const getChatsGral = (tag) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_LOADING });
    const { data } = await axiosInstance.get('/messages', {
      params: {
        tag,
      },
    });
    dispatch({
      type: CHAT_GET_MESSAGES,
      payload: {
        tag,
        messages: data.results,
      },
    });
  } catch (err) {
    catchError(err, dispatch, CHAT_ERROR);
  }
};

/**
 * @param {string} tag
 * @param {string} message
 * @returns {callbackDispatch}
 */
export const addMsgGralByTag = (tag, message) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/messages', {
      body: message,
      tag,
    });
    dispatch({
      type: CHAT_ADD_MESSAGE,
      payload: {
        message: data,
      },
    });
    return data;
  } catch (err) {
    catchError(err, dispatch, CHAT_ERROR);
    return {};
  }
};

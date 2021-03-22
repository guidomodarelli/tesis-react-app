import { combineReducers } from 'redux';
import {
  ERROR,
  LOADING,
  MESSAGE_ERRORS,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SING_UP,
} from '../types';
import { DELETE_USER } from '../types/usersTypes';
import usersReducer from './usersReducer';
import pubsReducer from './pubsReducer';

/**
 * @typedef {Object} FormError
 * @property {string} path
 * @property {string} message
 */

const INITIAL_STATE = {
  loading: true, // es el unico que empieza en true
  error: '',
  /** @type {FormError[]} */
  messageErrors: [],
  /** @type {?string} */
  userToken: null,
};

/**
 *
 * @param {INITIAL_STATE} state
 * @param {Record<string, any>} action
 * @returns
 */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MESSAGE_ERRORS:
      return {
        ...state,
        loading: false,
        error: '',
        messageErrors: action.payload,
      };
    case SIGN_IN:
    case RESTORE_TOKEN:
      return {
        ...state,
        loading: false,
        error: '',
        messageErrors: [],
        userToken: action.payload,
      };
    case DELETE_USER:
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
        loading: false,
      };
    case SING_UP:
      return {
        ...state,
        loading: false,
        messageErrors: [],
      };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
  pubsReducer,
});

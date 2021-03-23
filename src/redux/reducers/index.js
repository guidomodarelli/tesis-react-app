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
 *
 * @typedef {{
 *   loading: boolean;
 *   error: string,
 *   messageErrors: FormError[],
 *   userToken: ?string,
 * }} StateReducer
 *
 * @typedef {import("./pubsReducer").StatePubsReducer} StatePubsReducer
 *
 * @typedef {import("./usersReducer").StateUsersReducer} StateUsersReducer
 *
 * @typedef {{
 *  reducer: StateReducer;
 *  pubsReducer: StatePubsReducer;
 *  usersReducer: StateUsersReducer;
 * }} GlobalState
 *
 */

/**
 * @type {StateReducer}
 */
const INITIAL_STATE = {
  loading: true, // es el unico que empieza en true
  error: '',
  messageErrors: [],
  userToken: null,
};

/**
 *
 * @param {StateReducer} state
 * @param {{
 *  type: string;
 *  loading: boolean;
 *  messageErrors: FormError[];
 *  userToken: string;
 * }} action
 * @returns {StateReducer}
 */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case MESSAGE_ERRORS:
      return {
        ...state,
        loading: false,
        error: '',
        messageErrors: action.messageErrors,
      };
    case SIGN_IN:
    case RESTORE_TOKEN:
      return {
        ...state,
        loading: false,
        error: '',
        messageErrors: [],
        userToken: action.userToken,
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

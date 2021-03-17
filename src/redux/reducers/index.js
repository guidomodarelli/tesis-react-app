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

const INITIAL_STATE = {
  loading: true, // es el unico que empieza en true
  error: '',
  messageErrors: [],
  userToken: null,
};

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
});

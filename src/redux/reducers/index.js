import { combineReducers } from 'redux';
import {
  LOADING,
  ERROR,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
  SING_UP,
  AUTH_FAIL,
} from '../types';
import { DELETE_USER } from '../types/usersTypes';
import usersReducer from './usersReducer';

const INITIAL_STATE = {
  loading: true, // es el unico que empieza en true
  error: '',
  userToken: null,
  message: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_IN:
    case RESTORE_TOKEN:
      return {
        ...state,
        loading: false,
        error: '',
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
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
});

import { combineReducers } from 'redux';
import {
  LOADING,
  ERROR,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
} from '../types';
import usersReducer from './usersReducer';

const INITIAL_STATE = {
  loading: true, // es el unico que empieza en true
  error: '',
  userToken: null,
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
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
        loading: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
});

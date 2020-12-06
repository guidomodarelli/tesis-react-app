import { combineReducers } from 'redux';
import { LOADING, ERROR, SIGN_IN, SIGN_OUT, RESTORE_TOKEN } from '../types';
import usersReducer from './usersReducer';

const INITIAL_STATE = {
  isSignOut: false,
  loading: true, // es el unico que empieza en true
  error: '',
  userToken: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    case SIGN_IN:
    case RESTORE_TOKEN:
      return { ...state, loading: false, error: '', isSignOut: false, userToken: action.payload };
    case SIGN_OUT:
      return { ...state, loading: false, error: '', isSignOut: true, userToken: null };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
});

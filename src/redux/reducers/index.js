import { combineReducers } from 'redux';
import { LOADING, ERROR } from '../types';
import usersReducer from './usersReducer';

const INITIAL_STATE = {
  loggedIn: false,
  loading: false,
  error: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
});

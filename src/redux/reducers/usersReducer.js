import { GET_USERS, USER_ERROR, USER_LOADING } from '../types/usersTypes';

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: '',
};

const usersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, loading: false, error: '' };
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default usersReducers;

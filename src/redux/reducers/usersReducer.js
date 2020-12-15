import {
  DELETE_USER,
  GET_USERS,
  USER_ERROR,
  USER_LOADING,
  ADD_USER,
} from '../types/usersTypes';

const INITIAL_STATE = {
  users: [],
  loading: true,
  error: '',
};

const usersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, loading: false, error: '' };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload], loading: false, error: '' };
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter((el) => el.id !== action.id),
      };
    default:
      return state;
  }
};

export default usersReducers;

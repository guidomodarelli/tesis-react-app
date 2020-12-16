import { SIGN_OUT } from '../types';
import {
  DELETE_USER,
  GET_USERS,
  USER_ERROR,
  USER_LOADING,
  SET_CURRENT_USER,
  SET_FORM,
  PUT_USER,
  USER_NOT_LOADING,
  RESET_FORM,
} from '../types/usersTypes';

const initialForm = () => ({
  firstname: '',
  lastname: '',
  birthdate: '',
  jobtitle: '',
  instagram: '',
  email: '',
  password: '',
});

const initialUserData = () => ({
  id: '',
  role: '',
  firstname: '',
  lastname: '',
  birthdate: '',
  jobtitle: '',
  instagram: '',
  email: '',
  Permission: null,
});

const INITIAL_STATE = {
  users: [],
  loading: true,
  error: '',
  currentUser: initialUserData(),
  form: initialForm(),
};

const deleteCurrentUser = (users, id) => {
  return [...users.filter((el) => el.id !== id)];
};

const usersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        error: '',
        users: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER:
      if (state.currentUser.id === action.id) {
        return {
          ...INITIAL_STATE,
          loading: false,
          users: deleteCurrentUser(state.users, action.id),
        };
      }
      return {
        ...state,
        loading: false,
        error: '',
        users: deleteCurrentUser(state.users, action.id),
      };
    case SET_FORM:
      return {
        ...state,
        loading: false,
        error: '',
        form: action.payload,
      };
    case RESET_FORM:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: true,
        error: '',
        form: initialForm(),
        currentUser: action.payload,
      };
    case PUT_USER:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
        users: [
          ...state.users.filter((el) => el.id !== state.currentUser.id),
          {
            ...state.currentUser,
            ...state.form,
          },
        ],
      };
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
        users: state.users,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;

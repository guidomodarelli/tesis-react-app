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

const getUsersModified = (users, payload) => {
  users.forEach((el) => {
    if (el.email === payload.email) {
      el.firstname = payload.firstname;
      el.lastname = payload.lastname;
      el.birthdate = payload.birthdate;
      el.jobtitle = payload.jobtitle;
      el.instagram = payload.instagram;
      el.email = payload.email;
    }
  });
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
      return {
        ...state,
        loading: false,
        error: '',
        users: [...state.users.filter((el) => el.id !== action.id)],
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
      getUsersModified(state.users, action.payload);
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
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

export default usersReducers;

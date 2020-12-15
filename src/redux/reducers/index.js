import { combineReducers } from 'redux';
import {
  LOADING,
  ERROR,
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
  SET_FORM,
  SET_CURRENT_USER,
} from '../types';
import usersReducer from './usersReducer';

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
  isSignOut: false,
  loading: true, // es el unico que empieza en true
  error: '',
  userToken: null,
  currentUser: initialUserData(),
  form: initialForm(),
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true, form: initialForm() };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        form: initialForm(),
      };
    case SIGN_IN:
    case RESTORE_TOKEN:
      return {
        ...state,
        loading: false,
        error: '',
        isSignOut: false,
        userToken: action.payload,
        form: initialForm(),
      };
    case SIGN_OUT:
      return {
        ...state,
        loading: false,
        error: '',
        isSignOut: true,
        userToken: null,
        form: initialForm(),
      };
    case SET_FORM:
      return {
        ...state,
        loading: false,
        error: '',
        isSignOut: true,
        userToken: null,
        form: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: true,
        error: '',
        isSignOut: false,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer,
  reducer,
});

import { MESSAGE_ERRORS, SIGN_OUT } from '../types';
import {
  DELETE_USER,
  GET_USERS,
  PUT_ADMIN_PERMISSIONS,
  PUT_USER,
  RESET_FORM,
  SET_CURRENT_USER,
  SET_FORM,
  USER_ERROR,
  USER_LOADING,
  UPLOADING,
} from '../types/usersTypes';

const initialForm = () => ({
  email: '',
  name: '',
  birthdate: '',
  bio: '',
  instagram: '',
  password: '',
  role: 'normal',
  addGroup: false,
  addNewAdmins: false,
  changeGroupInfo: false,
  changeGroupUser: false,
  changePermissionsAdmins: false,
  changeRoutine: false,
  deletePosts: false,
  deleteUsers: false,
  deleteVotes: false,
});

const INITIAL_STATE = {
  users: [],
  loading: true,
  error: '',
  uploading: false,
  currentUser: {
    id: '',
    ...initialForm(),
    bio: null,
    instagram: null,
  },
  form: initialForm(),
};

const deleteCurrentUser = (users, id) => {
  return [...users.filter((el) => el.id !== id)];
};

const updateUserList = (users, userId, payload) => {
  return users.map((el) => {
    if (el.id === userId) {
      return { ...el, ...payload, id: el.id };
    }
    return el;
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
    case UPLOADING:
      return {
        ...state,
        uploading: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
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
        loading: false,
        error: '',
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
          id: state.currentUser.id,
        },
        users: updateUserList(state.users, state.currentUser.id, action.payload),
      };
    case PUT_ADMIN_PERMISSIONS:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        users: updateUserList(state.users, action.userId, action.payload),
      };
    case MESSAGE_ERRORS:
      return {
        ...state,
        loading: false,
        uploading: false,
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

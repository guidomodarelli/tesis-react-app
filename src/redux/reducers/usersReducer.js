import { SIGN_OUT } from '../types';
import {
  DELETE_USER,
  GET_USERS,
  PUT_OTHER_USER,
  PUT_USER,
  RESET_FORM,
  SET_CURRENT_USER,
  SET_FORM,
  USER_ERROR,
  USER_LOADING,
} from '../types/usersTypes';

const initialForm = () => ({
  email: '',
  firstname: '',
  lastname: '',
  birthdate: '',
  jobtitle: '',
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
  currentUser: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    jobtitle: null,
    instagram: null,
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
  },
  form: {
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    jobtitle: '',
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
  },
};

const deleteCurrentUser = (users, id) => {
  return [...users.filter((el) => el.id !== id)];
};

const updateUserList = (users, userId, payload) => {
  const user = users.find((el) => el.id === userId);
  return [
    ...users.filter((el) => el.id !== userId),
    { ...user, ...payload },
  ];
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
        },
        users: updateUserList(state.users, state.currentUser.id, action.payload),
      };
    case PUT_OTHER_USER:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        users: updateUserList(state.users, action.userId, action.payload),
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

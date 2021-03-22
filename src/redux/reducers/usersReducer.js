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

/**
 * @typedef {"normal" | "admin"} ROLE
 */

/**
 * @typedef {Object} UserForm
 * @property {string} email
 * @property {string} name
 * @property {Date} birthdate
 * @property {string} bio
 * @property {string} instagram
 * @property {string} password
 * @property {ROLE} role
 * @property {boolean} addGroup
 * @property {boolean} addNewAdmins
 * @property {boolean} changeGroupInfo
 * @property {boolean} changeGroupUser
 * @property {boolean} changePermissionsAdmins
 * @property {boolean} changeRoutine
 * @property {boolean} deletePosts
 * @property {boolean} deleteUsers
 * @property {boolean} deleteVotes
 */

/**
 * @typedef {UserForm & {id: string, bio: ?string, instagram: ?string, password: ?string}} User
 */

/**
 *
 * @returns {UserForm}
 */
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
  /**
   * @type {User[]}
   */
  users: [],
  loading: true,
  error: '',
  uploading: false,
  /**
   * @type {User}
   */
  currentUser: {
    id: '',
    ...initialForm(),
    bio: null,
    instagram: null,
  },
  form: initialForm(),
};

/**
 *
 * @param {User[]} users
 * @param {string} id
 * @returns {User[]}
 */
const deleteCurrentUser = (users, id) => {
  return [...users.filter((el) => el.id !== id)];
};

/**
 *
 * @param {User[]} users
 * @param {string} userId
 * @param {User} payload
 * @returns
 */
const updateUserList = (users, userId, payload) => {
  return users.map((user) => {
    if (user.id === userId) {
      return { ...user, ...payload, id: user.id };
    }
    return user;
  });
};

/**
 *
 * @param {INITIAL_STATE} state
 * @param {Record<string, any>} action
 * @returns {INITIAL_STATE}
 */
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
        users: updateUserList(
          state.users,
          state.currentUser.id,
          action.payload,
        ),
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

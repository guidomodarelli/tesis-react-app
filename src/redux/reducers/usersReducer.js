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
 * @property {string} birthdate
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

/**
 * @typedef {{
 *  users: User[];
 *  loading: boolean;
 *  error: string;
 *  uploading: boolean;
 *  currentUser: User;
 *  form: UserForm;
 * }} StateUsersReducer
 */

/**
 * @type {StateUsersReducer}
 */
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
 * @param {UserForm} newDataUser
 * @returns
 */
const updateUserList = (users, userId, newDataUser) => {
  return users.map((user) => {
    if (user.id === userId) {
      return { ...user, ...newDataUser, id: user.id };
    }
    return user;
  });
};

/**
 *
 * @param {string} userId
 * @param {StateUsersReducer} state
 * @returns {StateUsersReducer}
 */
function deleteUser(state, userId) {
  const newState = {
    loading: false,
    error: '',
    users: deleteCurrentUser(state.users, userId),
  };
  if (state.currentUser.id === userId) {
    return {
      ...INITIAL_STATE,
      ...newState,
    };
  }
  return {
    ...state,
    ...newState,
  };
}

/**
 *
 * @param {StateUsersReducer} state
 * @param {{
 *  type: string;
 *  newUsers: User[];
 *  loading: boolean;
 *  uploading: boolean;
 *  userId: string;
 *  form: UserForm;
 *  error: string;
 *  newCurrentUser: User;
 * }} action
 * @returns {StateUsersReducer}
 */
const usersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        error: '',
        users: action.newUsers,
      };
    case UPLOADING:
      return {
        ...state,
        uploading: action.uploading,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_USER:
      return deleteUser(state, action.userId);
    case SET_FORM:
      return {
        ...state,
        loading: false,
        error: '',
        form: action.form,
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
        currentUser: action.newCurrentUser,
      };
    case PUT_USER:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        currentUser: {
          ...state.currentUser,
          ...action.form,
          id: state.currentUser.id,
        },
        users: updateUserList(
          state.users,
          state.currentUser.id,
          action.form,
        ),
      };
    case PUT_ADMIN_PERMISSIONS:
      return {
        ...state,
        loading: false,
        error: '',
        form: initialForm(),
        users: updateUserList(state.users, action.userId, action.form),
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

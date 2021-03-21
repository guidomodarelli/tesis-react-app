import {
  GET_NEXT_PUBS,
  GET_PUBS,
  LIKE_PUB,
  POST_PUBS,
  PUBS_CHANGE_FORM,
  PUBS_ERROR,
  PUBS_LOADING,
  PUBS_MESSAGE_ERRORS,
  PUBS_UPLOADING,
  UNLIKE_PUB,
} from '../types/pubsTypes';

const initialForm = () => ({
  body: '',
  scope: 'private',
});

const INITIAL_STATE = {
  loading: true,
  uploading: false,
  error: '',
  pubs: [],
  page: 1,
  pages: 1,
  form: initialForm(),
  messageErrors: [],
};

const pubsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UNLIKE_PUB:
      return {
        ...state,
        pubs: state.pubs.map((pub) => {
          if (pub.id === action.pubId) {
            return {
              ...pub,
              favUsers: pub.favUsers.filter((userId) => userId !== action.userId),
              favs: pub.favs - 1,
            };
          }
          return pub;
        }),
      };
    case LIKE_PUB:
      return {
        ...state,
        pubs: state.pubs.map((pub) => {
          if (pub.id === action.pubId) {
            return {
              ...pub,
              favUsers: [...pub.favUsers, action.userId],
              favs: pub.favs + 1,
            };
          }
          return pub;
        }),
      };
    case PUBS_UPLOADING:
      return {
        ...state,
        uploading: true,
      };
    case PUBS_CHANGE_FORM:
      return {
        ...state,
        form: action.payload,
      };
    case PUBS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PUBS:
      return {
        ...state,
        loading: false,
        error: '',
        pubs: action.payload,
        page: action.page,
        pages: action.pages,
      };
    case GET_NEXT_PUBS:
      return {
        ...state,
        loading: false,
        error: '',
        pubs: [...state.pubs, ...action.payload],
        page: action.page,
        pages: action.pages,
      };
    case POST_PUBS:
      return {
        ...state,
        loading: false,
        error: '',
        uploading: false,
        pubs: [action.payload, ...state.pubs],
        messageErrors: [],
        form: initialForm(),
      };
    case PUBS_MESSAGE_ERRORS:
      return {
        ...state,
        messageErrors: action.payload,
      };
    case PUBS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pubsReducer;

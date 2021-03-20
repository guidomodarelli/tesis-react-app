import {
  GET_PUBS,
  POST_PUBS,
  PUBS_CHANGE_FORM,
  PUBS_ERROR,
  PUBS_LOADING,
  PUBS_MESSAGE_ERRORS,
  PUBS_UPLOADING,
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
  form: initialForm(),
  messageErrors: [],
};

const pubsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

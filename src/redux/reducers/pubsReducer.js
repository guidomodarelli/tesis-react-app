import { GET_PUBS, PUBS_ERROR, PUBS_LOADING } from '../types/pubsTypes';

const INITIAL_STATE = {
  loading: true,
  error: '',
  pubs: [],
};

const pubsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

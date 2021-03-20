import { catchError } from '.';
import axios from '../../config';
import { GET_PUBS, PUBS_ERROR, PUBS_LOADING } from '../types/pubsTypes';

// eslint-disable-next-line import/prefer-default-export
export const getAllPubs = () => async (dispatch) => {
  try {
    dispatch({ type: PUBS_LOADING });
    const { data } = await axios.get('/pubs');
    dispatch({ type: GET_PUBS, payload: data.results });
  } catch (err) {
    catchError(err, dispatch, PUBS_ERROR);
  }
};

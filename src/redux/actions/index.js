import { ERROR, LOADING } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const isLoggedIn = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const data = await api.get.loggedIn();
    dispatch({ type: LOADING, payload: false });
    return data.loggedIn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
    return false;
  }
};

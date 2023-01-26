// export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
// export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
// export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// //? async requests - way
// export const fetchUsers = () => async (dispatch, getState, api) => {
//   //? api: axiosInstance , we sent this in the store . details are there
//   dispatch({ type: FETCH_USERS_PENDING });
//   try {
//     const { data } = await api.get('/users');

//     dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: FETCH_USERS_FAILED, payload: error });
//   }
// };

import axios from 'axios';
import { keys } from '../../../config/keys';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
//? async requests - way
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there
  const { data } = await axios.get(`${keys.BACKEND}/api/users/currentUser`);
  dispatch({ type: FETCH_CURRENT_USER, payload: data.currentUser });
};

export const FETCH_ALL_ADS = 'FETCH_ALL_ADS';
// ? async requests - way
export const fetchAllAds = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there
  const { data } = await axios.get(`${keys.BACKEND}/api/ads/get-all-ads`);
  dispatch({ type: FETCH_ALL_ADS, payload: data });
};

export const FETCH_ALL_ITEMS = 'FETCH_ALL_ITEMS';
// ? async requests - way
export const fetchAllItems = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there
  const { data } = await axios.get(`${keys.BACKEND}/api/ads/get-all-items`);
  dispatch({ type: FETCH_ALL_ITEMS, payload: data });
};

//? sync  action
// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });

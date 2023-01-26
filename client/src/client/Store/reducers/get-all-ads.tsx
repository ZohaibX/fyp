import { FETCH_ALL_ADS } from '../actions/index';

//? async reducer function
export const FetchAllAdsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_ADS:
      return action.payload;
    default:
      return state;
  }
};

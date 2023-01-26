import { FETCH_ALL_ADS, FETCH_ALL_ITEMS } from '../actions/index';

//? async reducer function
export const FetchAllItemsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

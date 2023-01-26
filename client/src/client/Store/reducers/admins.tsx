import { FETCH_ADMINS } from '../actions/index';

//? async reducer function
export const FetchAdminsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return action.payload;
    default:
      return state;
  }
};

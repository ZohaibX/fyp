import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} from '../actions/index';

const initialState = {
  isPending: false,
  data: [],
  error: '',
};

//? async reducer function
export const FetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return { ...state, isPending: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, data: action.payload, isPending: false };
    case FETCH_USERS_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

//? sync redux reducer
// const initialStateSearch = {
//   userToken: "",
// };

// we cannot change our state . so we will have to recreate it with some changes we need
// export const userToken = (state = initialStateSearch, action = {}) => {
//   if (action.type === UserToken) {
//     return { ...state, userToken: action.payload };
//   } else return state; // reducers must be returning something
// };

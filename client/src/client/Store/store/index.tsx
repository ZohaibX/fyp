import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import rootReducer from '../reducers/index';
import { createLogger } from 'redux-logger';
import { keys } from '../../../config/keys';
const logger = createLogger();

// God way of adding some property to some built-in method
declare global {
  interface Window {
    INITIAL_STATE: any;
  }
}

const axiosInstance = axios.create({
  // Replace
  baseURL: `${keys.BACKEND}/api`,
});
// TODO i can assign any baseURL here, and will declare a proxy route.
// proxy route will be the backend, where i wanna send the data
// so as i have set baseURL '/api' and i send request to '/users'
// then, request will go to server side - index.tsx and /api will be replaced to some backend route
// and, request will become something like https://backendService/users

//! Remember -- if i wanna send request to some different route, i will have to send request to that route only
// '/api/users' method is only for the route, that is set in the server side - index.tsx

// window.INITIAL_STATE is equal to the redux state data, that is fetched on the first reload, by server side
// this is set in the renderer file html doc
const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument(axiosInstance))
  ) // add (thunkMiddleware , logger ) if wish -- logger
);
// logger is for console

export default store;

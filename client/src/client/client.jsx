//? Startup point for client side

import 'babel-polyfill'; // to use async await
import * as React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import { renderRoutes } from 'react-router-config';

import store from './Store/store/index';
import { Provider } from 'react-redux';

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

// important to use hydrate here

import * as React from 'react';

const NotFound = ({ staticContext = { notFound: false } }) => {
  staticContext.notFound = true; // this value, we will set here, and we have set this in server file -- index.tsx
  return <h1>Oops.. Page Not Found </h1>;
};

export default {
  component: NotFound,
};

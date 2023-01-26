import * as React from 'react';
import { connect } from 'react-redux';
import RequireAuth from '../components/hocs/require-auth';

const Test = (props) => {
  return 'Im a test Page';
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default {
  component: connect(mapStateToProps)(RequireAuth(Test)),
};

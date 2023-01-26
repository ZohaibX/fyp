//! This HOC is specially for wrapping a normal component
//! and here, we can apply any rule, to redirect the user..

//? This is redirection, for authorization

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      if (this.props.currentUser === false) return <Redirect to="/sign-in" />;
      if (this.props.currentUser === null)
        return (
          <div className="text-center my-5" style={{ fontWeight: 'bold' }}>
            Loading...
          </div>
        );
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(RequireAuth);
};

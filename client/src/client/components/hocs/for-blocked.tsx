//! This HOC is specially for wrapping a normal component
//! and here, we can apply any rule, to redirect the user..

//? This is redirection, for authorization

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
  class ForBlocked extends Component {
    render() {
      const { currentUser } = this.props;

      if (currentUser && currentUser.blocked)
        return (
          <h1 className="text-center my-5">
            This Account is Blocked! Please Logout, to continue
          </h1>
        );

      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(mapStateToProps)(ForBlocked);
};

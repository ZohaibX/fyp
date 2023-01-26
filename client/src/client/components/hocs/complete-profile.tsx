//! This HOC is specially for wrapping a normal component
//! and here, we can apply any rule, to redirect the user..

//? This is redirection, for authorization

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
    class RequireProfileCompletion extends Component {
        render() {
            if (
                this.props.currentUser &&
                !this.props.currentUser.completed_profile
            )
                return (
                    <Redirect
                        to={`/user-${btoa(
                            this.props.currentUser.id
                        )}-profile-${btoa('true')}`}
                    />
                );
            else return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps({ currentUser }) {
        return { currentUser };
    }

    return connect(mapStateToProps)(RequireProfileCompletion);
};

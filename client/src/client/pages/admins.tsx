//! This page is special, bcoz we have applied routes redirection using HOC

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../Store/actions/index';
import RequireAuth from '../components/hocs/require-auth';
import { Helmet } from 'react-helmet';

const Admins = (props) => {
    useEffect(() => {
        props.fetchAdmins();
    }, []);

    //? This function is for SEO
    const head = () => (
        <Helmet>
            <title>{`${props.admins.length} Admins Loaded`}</title>
            {/* // this is how we will make our title dynamic */}
            <meta property="og:title" content="Admins List"></meta>
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    return (
        <div style={{ minHeight: '75vh' }}>
            {head()}
            {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}
            <h1>Protected List Of Routes</h1>
            <ul>
                {props.admins.map((admin) => (
                    <li key={admin.id}>{admin.name}</li>
                ))}
            </ul>
        </div>
    );
};

function mapStateToProps({ admins }) {
    return { admins };
}

export default {
    loadData: ({ dispatch }) => dispatch(fetchAdmins()), // short way of loadData fn
    component: connect(mapStateToProps, { fetchAdmins })(RequireAuth(Admins))
};

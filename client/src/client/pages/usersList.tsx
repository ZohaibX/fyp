import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../Store/actions/index';
import { Helmet } from 'react-helmet';

const UsersList = (props: any) => {
  useEffect(() => {
    props.fetchCurrentUser();
  }, []);

  //? this function is special for SEO
  const head = () => (
    <Helmet>
      <title>{`${props.users.data.length} Users Loaded`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property="og:title" content="Users List"></meta>
      {/* // this title is for SEO -- to identify this page title  */}
      {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

  return (
    <div>
      {head()}
      {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}
      <h1> UsersList </h1>
      <h4>User Data is: {props.currentUser.googleId}</h4>
      <ul>
        {props.users.data.map((user) => (
          <li key={user.id + user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ users, currentUser }) {
  return { users, currentUser };
}

export default {
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
  component: connect(mapStateToProps, { fetchCurrentUser })(UsersList),
};

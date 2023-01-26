import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import RequireAuth from '../components/hocs/require-auth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { keys } from '../../config/keys';

const Profile = (props) => {
  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(
        `${keys.BACKEND}/api/users/currentUserData`
      );
      setUserData(data);
    };
    fetchUserData();
  }, []);

  let title;
  if (props.currentUser) title = props.currentUser.username;
  else title = 'Profile';
  //! This function is for SEO
  const head = () => (
    // Replace --- title must be user's title
    <Helmet>
      <title>{`${title}`}</title>
    </Helmet>
  );

  return (
    <div>
      {head()}
      <h1 className="text-center my-5" style={{ fontFamily: 'Alfa Slab One' }}>
        {props.currentUser.username}
      </h1>

      {/* // IMAGE LAYOUT FROM PORTAL WEBSITE  */}
      <figure className="image-box">
        <img
          src={
            props.currentUser && props.currentUser.image
              ? props.currentUser.image
              : 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          }
          alt="Zohaib Butt X"
          className="image-box__image"
        />
        <figcaption className="image-box__caption">
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            to="/"
          >
            Change Picture
          </Link>
        </figcaption>
      </figure>
    </div>
  );
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default {
  component: connect(mapStateToProps)(RequireAuth(Profile)),
};

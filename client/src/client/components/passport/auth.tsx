import React from 'react';
import axios from 'axios';
import { keys } from '../../../config/keys';

function Passport(props) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const getUser = async () => {
      let { data } = await axios.get(`${keys.BACKEND}/api/users/currentUser`);
      setUser(data);
    };
    getUser();
  }, []);
  //! whenever we go to the main page -- redux will run and get current user from fb or google and will get their data

  // Replaces
  return (
    <div className="App">
      Passport App
      <br />
      <a href={`${keys.BACKEND}/auth/google`}> Sign In By Google </a>
      <br />
      <a href={`${keys.BACKEND}/auth/facebook`}> Sign In By Facebook </a>
      <br />
      <a href={`${keys.BACKEND}/api/users/signOut`}>Logout </a>
      <br />
    </div>
  );
}

export default Passport;

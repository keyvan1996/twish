import React from 'react';
import { logout } from './firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import { useSession } from './firebase/UserProvider';



function Header() {
  const history = useHistory();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push('/login');
  };

  const addTwish = async () => {
    history.push('/addtwish');
  };

  const goProfile = async () => {
    history.push(`/profile/${user.uid}`);
  };

  const goAbout = async () => {
    history.push(`/about`);
  };

  const goLogin = async () => {
    history.push(`/login`);
  };

  return (
    <header>
      <h2>
      <button onClick={goAbout}>Twish</button>
      </h2>
      {!user && (
      <button className="ui secondary button loginb" onClick={goLogin}>
          Login
        </button>
      )}

      {!!user && (
        <button className="ui secondary button logout" onClick={logoutUser}>
          LOGOUT
        </button>
      )}
      {!!user && (
        <button className="ui secondary button logout" onClick={goProfile}>
          Profile
        </button>
      )}
      {!!user && (
        <button className="ui secondary button logout" onClick={addTwish}>
          Add Twish
        </button>
      )}
    </header>
  );
}

export default Header;

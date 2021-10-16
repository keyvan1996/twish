import React, { useState } from "react";
import { logout } from './firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import { useSession } from './firebase/UserProvider';




function Header() {
  const history = useHistory();
  const { user } = useSession();
  const { isAdmin } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push('/login');
  };

  const addTwish = async () => {
    history.push(`/addtwish/${user.uid}`);
  };

  const twishList = async () => {
    history.push(`/twishlist/${user.uid}`);
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

  const goUsers = async () => {
    history.push('/users');
  }

  const goSuggestions = async () => {
    history.push('/suggestions');
  }

  return (
    <header>
      <h2>
      <button onClick={goAbout}>Twish</button>
      </h2>
      {!user && (
      <button className="ui inverted primary button loginb" onClick={goLogin}>
          Login
        </button>
      )}

      {!!user && (
        <button className="ui inverted red button logout" onClick={logoutUser}>
          LOGOUT
        </button>
      )}
      {!!user && !isAdmin && (
        <button className="ui inverted primary button logout" onClick={goProfile}>
          Profile
        </button>
      )}
          {!!user && !isAdmin && (
            <button className="ui inverted primary button logout" onClick={twishList}>
              Twish List
            </button>
          )}
      {!!user && !isAdmin && (
        <button className="ui inverted primary button logout" onClick={addTwish}>
          Add Twish
        </button>
      )}

      {isAdmin && (
        <button className="ui inverted primary button logout" onClick={goUsers}>
          Users
        </button>
      )}
      {isAdmin && (
        <button className="ui inverted primary button logout" onClick={goSuggestions}>
          Suggestions
        </button>
      )}
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { logout } from './firebase/auth';
import { Link, useHistory, NavLink } from 'react-router-dom';
import { useSession } from './firebase/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'





function Header() {
  const history = useHistory();
  const { user } = useSession();
  const { isAdmin } = useSession();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const logoutUser = async () => {
    await logout();
    history.push('/login');
    setClick(!click);
  };

  const addTwish = async () => {
    history.push(`/addtwish/${user.uid}`);
    setClick(!click);
  };

  const twishList = async () => {
    history.push(`/twishlist/${user.uid}`);
    setClick(!click);
  };

  const goProfile = async () => {
    history.push(`/profile/${user.uid}`);
    setClick(!click);
  };

  const goAbout = async () => {
    history.push(`/about/${user.uid}`);
    setClick(!click);
  };

  const goLogin = async () => {
    history.push(`/login`);
    setClick(!click);
  };

  const goUsers = async () => {
    history.push('/users');
    setClick(!click);
  }

  const goSuggestions = async () => {
    history.push('/suggestions');
    setClick(!click);
  }

  return (
    // <header>
    //   <h2>
    //   <button onClick={goAbout}>Twish</button>
    //   </h2>
    //   {!user && (
    //   <button className="ui inverted primary button loginb" onClick={goLogin}>
    //       Login
    //     </button>
    //   )}

    //   {!!user && (
    //     <button className="ui inverted red button logout" onClick={logoutUser}>
    //       LOGOUT
    //     </button>
    //   )}
      
    //   {!!user && !isAdmin && (
    //     <button className="ui inverted primary button logout" onClick={goProfile}>
    //       Profile
    //     </button>
    //   )}
    //       {!!user && !isAdmin && (
    //         <button className="ui inverted primary button logout" onClick={twishList}>
    //           Twish List
    //         </button>
    //       )}
    //   {!!user && !isAdmin && (
    //     <button className="ui inverted primary button logout" onClick={addTwish}>
    //       Add Twish
    //     </button>
    //   )}

    //   {isAdmin && (
    //     <button className="ui inverted primary button logout" onClick={goUsers}>
    //       Users
    //     </button>
    //   )}
    //   {isAdmin && (
    //     <button className="ui inverted primary button logout" onClick={goSuggestions}>
    //       Suggestions
    //     </button>
    //   )}
    // </header>





    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link 
            className="nav-logo"
            >
            Twish
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
          {!user && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={goLogin}
              >
                Login
              </Link>
            </li>
          )}
          {!!user && !isAdmin && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={goProfile}
              >
                Profile
              </Link>
            </li>
          )}
          {!!user && !isAdmin && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={twishList}
              >
                Twish List
              </Link>
            </li>
          )}
          {!!user && !isAdmin && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={addTwish}
              >
                Add Twish
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={goUsers}
              >
                Users
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={goSuggestions}
              >
                Suggestions
              </Link>
            </li>
          )}
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={goAbout}
              >
                About Us
              </Link>
            </li>
            {!!user && (
            <li className="nav-item">
              <Link
                activeClassName="active"
                className="nav-links"
                onClick={logoutUser}
              >
                LOGOUT
              </Link>
            </li>
          )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fa fa-times" : "fa fa-bars"}></i> */}
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

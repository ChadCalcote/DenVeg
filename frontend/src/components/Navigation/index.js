import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './DenVegLogo.png';

/* <ul id="top-nav-bar"> */
      /* <li>
        <h2>DenVeg</h2>
      </li>
      <li>
        <NavLink exact to="/">Home</NavLink> */
    //   </li>
    // </ul>

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavLink className="nav-link-button" to="/restaurants">
          Restaurants
        </NavLink>
        <NavLink className="nav-link-button" to="/foodItems">
          Food Items
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="top-nav-bar">
      <NavLink className="header nav-link" exact to="/">
        DenVeg
      </NavLink>
      <div className="nav-container">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
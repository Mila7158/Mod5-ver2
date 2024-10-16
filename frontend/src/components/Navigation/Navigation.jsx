
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaBars } from 'react-icons/fa';
import './Navigation.css';
import { useState } from 'react';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const sessionLinks = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </>
  );

  return (
    <nav className="navigation">
      <NavLink to="/" className="logo">
        <img src="/house-logo.png" alt="Logo" />
        <span className="logo-name">HOMEAWAY</span>
      </NavLink>
      <ul>
        {isLoaded && (
          <div className="icon-container">
            {!sessionUser && (
              <button className="ham-button" onClick={toggleMenu}>
                <FaBars />
              </button>
            )}
            {showMenu && !sessionUser && (
              <ul className="menu-dropdown">
                {sessionLinks}
              </ul>
            )}
            {sessionUser && <ProfileButton user={sessionUser} />}
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

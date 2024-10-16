// // frontend/src/components/Navigation/ProfileButton.jsx

// // import { useState, useEffect, useRef } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { FaUserCircle } from 'react-icons/fa';
// // import * as sessionActions from '../../store/session';
// // import './Navigation.css';

// // function ProfileButton({ user }) {
// //   const dispatch = useDispatch();
// //   const [showMenu, setShowMenu] = useState(false);
// //   const ulRef = useRef();

// //   const toggleMenu = (e) => {
// //     e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
// //     // if (!showMenu) setShowMenu(true);
// //     setShowMenu(!showMenu);
// //   };

// //   useEffect(() => {
// //     if (!showMenu) return;

// //     const closeMenu = (e) => {
// //       if (ulRef.current && !ulRef.current.contains(e.target)) {
// //         setShowMenu(false);
// //       }
// //     };

// //     document.addEventListener('click', closeMenu);

// //     return () => document.removeEventListener('click', closeMenu);
// //   }, [showMenu]);

// //   const logout = (e) => {
// //     e.preventDefault();
// //     dispatch(sessionActions.logout());
// //   };

// //   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

// //   return (
// //     <>
// //       <button onClick={toggleMenu}>
// //         <FaUserCircle />
// //       </button>
// //       <ul className={ulClassName} ref={ulRef}>
// //         <li>{user.username}</li>
// //         <li>{user.firstName} {user.lastName}</li>
// //         <li>{user.email}</li>
// //         <li>
// //           <button onClick={logout}>Log Out</button>
// //         </li>
// //       </ul>
// //     </>
// //   );
// // }

// // export default ProfileButton;


// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
// import * as sessionActions from '../../store/session';
// import './Navigation.css'; // Import CSS for dropdown styles

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); 
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener('click', closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         <li>Hello, {user.firstName}</li>
//         <li>{user.email}</li>
//         <li>
//           <button onClick={logout}>Log Out</button>
//         </li>
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-menu">
      <button onClick={toggleMenu} className="profile-icon">
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.username}</li>
        <li>{user.email}</li>
        <li><NavLink to="/spots">Manage Spots</NavLink></li>
        <li><button onClick={logout}>Log Out</button></li>
      </ul>
    </div>
  );
}

export default ProfileButton;

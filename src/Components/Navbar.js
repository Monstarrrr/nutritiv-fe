import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Helpers/logout';

export default function Navbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.loggedIn)
  const userUsername = useSelector(state => state.user.username)
  
  // LOGOUT
  const handleLogout = () => logout(dispatch);
  
  return (
    <nav>
      <Link to="/welcome">NUTRITIV</Link>
      <span>----</span>
      {
        loggedIn ? (
          <>
            <Link to="/profile">
              { userUsername }
            </Link>
            <span>----</span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">REGISTER</Link>
            <span>----</span>
            <Link to="/login">LOGIN</Link>
          </>
        )
      }
    </nav>
  )
}

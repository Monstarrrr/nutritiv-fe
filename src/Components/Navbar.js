import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import GitInfo from 'react-git-info/macro';
import { logout } from '../Helpers/logout';
import './Navbar.scss';

export default function Navbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.loggedIn)
  const userUsername = useSelector(state => state.user.username)
  const cartQuantity = useSelector(state => state.user.cartQuantity)
  const navigate = useNavigate();
  const gitInfo = GitInfo();

  // HANDLE LOGOUT
  const handleLogout = () => logout(dispatch);
  
  console.log('# gitInfo :', gitInfo)

  return (
    <nav id={"navbar"}>
      <Link className={'test'} to="/welcome">HOMEPAGE</Link>
      <span>----</span>
      <Link to="/products">
        PRODUCTS
      </Link>
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
      <span>----</span>
      <button onClick={() => navigate('/cart')}>
        Cart ({cartQuantity})
      </button>
      <p>{gitInfo.commit.message}</p>
    </nav>
  )
}

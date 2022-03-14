import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from './Logout';
import './Navbar.scss';

export default function Navbar() {
  const userSelector = useSelector(state => state.user)
  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    cartQuantity: 0,
    avatar: "",
  })
  
  useEffect(() => {
    setUser(userSelector)
  }, [userSelector]);
  
  const navigate = useNavigate();
  
  return (
    <nav id={"navbar"}>
      <Link className={'test'} to="/welcome">HOMEPAGE</Link>
      <span>----</span>
      <Link to="/products">
        PRODUCTS
      </Link>
      <span>----</span>
      {
        user.loggedIn ? (
          <>
            <Link to="/profile">
              { user.username }
            </Link>
            <span>----</span>
            <img 
              alt="avatar" 
              style={{
                maxWidth: "30px",
              }}
              src={user.avatar} 
            />
            <span>----</span>
            <Logout />
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
        Cart ({user.cartQuantity})
      </button>
    </nav>
  )
}

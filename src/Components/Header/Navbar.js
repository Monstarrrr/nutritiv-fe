import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../Authentication/Logout';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  
  return (
    <nav className={styles.navbar}>
      <Link 
        className={styles.test} 
        to="/welcome"
      >
        <img 
          alt="nutritiv logo"
          src="/logo.png"
          className={styles.logo}
        />
      </Link>
      <span>----</span>
      <Link 
        className={styles.test} 
        to="/welcome"
      >
        HOME
      </Link>
      <span>----</span>
      <Link 
        to="/products"
        className={styles.test} 
      >
        PRODUCTS
      </Link>
      <span>----</span>
      <Link 
        to="/chat"
        className={styles.test} 
      >
        CHATS
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
            <button onClick={() => navigate('/cart')}>
              Cart 
              {
                user?.cartQuantity > 0 && (
                  <span>({user.cartQuantity})</span>
                )
              }
            </button>
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
    </nav>
  )
}

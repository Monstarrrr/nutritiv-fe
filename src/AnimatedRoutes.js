import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Cart } from './Components/Cart'
import { ChatConnection } from './Components/ChatConnection'
import { CheckoutCancel } from './Components/CheckoutCancel'
import { CheckoutSuccess } from './Components/CheckoutSuccess'
import { Homepage } from './Components/Homepage'
import { PageNotFound } from './Components/PageNotFound'
import { ProductPage } from './Components/ProductPage'
import { Products } from './Components/Products'
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import Profile from './Components/Profile'
import { AnimatePresence } from "framer-motion"

export const AnimatedRoutes = () => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const location = useLocation();
  
  // RESTRICTED ROUTES
  const Restricted = ({ type }) => {
    const cartSelection = location.state?.cartSelection;
    console.log('# APP.JS - cartSelection :', cartSelection)
    const isLogged = () => {
      console.log('# loggedIn :', loggedIn)
      return loggedIn;
    }
    if(loggedIn !== null) {
      if(type === "guest") {
        if(isLogged()){
          if(location.state?.from) {
            return <Navigate 
              replace 
              to={location.state.from}
              state={{cartSelection: cartSelection}}
            />
          } else {
            return <Navigate replace to="/" />
          }
        } else {
          return <Outlet />;
        }
      } else if(type === "user") {
        return isLogged() ? (
          <Outlet /> 
        ) : <Navigate replace to="/" />;
      }
    } else {
      return <h2>Loading user data...</h2>
    }
  }
  
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC */}
        {/* <Route path="*" element={<Navigate replace to="/page-not-found"/>} /> */}
        <Route index element={<Homepage/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product">
          <Route path=":productTitle" element={<ProductPage/>} />
        </Route>
        <Route path="/chat" element={<ChatConnection/>} /> 
        <Route path="/cancel" element={<CheckoutCancel/>} /> 
        <Route path="/success" element={<CheckoutSuccess/>} />
        <Route path="/page-not-found" element={<PageNotFound/>} />
        {/* PRIVATE */}
        {/* RESTRICTED - USER */}
        <Route element={<Restricted type="user" />}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart/>} />
        </Route>
        {/* RESTRICTED - GUEST */}
        <Route element={<Restricted type="guest" />}>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
        {/* </Route> */}
      </Routes>
    </AnimatePresence>
  )
}
import React, { useEffect } from 'react';
import { 
  // useSelector, 
  useDispatch,
  useSelector,
} from "react-redux";
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  updateUser,
} from './Redux/reducers/user';
import { apiGetSelfCart, apiGetUserSelf } from './Api/nutritivApi';
import HomePage from './Layouts/HomePage.js';
import RegisterPage from './Layouts/RegisterPage.js';
import LoginPage from './Layouts/LoginPage.js';
import Navbar from './Components/Navbar';
import Profile from './Layouts/Profile';
import { Products } from './Components/Products';
import { CheckoutSuccess } from './Components/CheckoutSuccess';
import { CheckoutCancel } from './Components/CheckoutCancel';
import { ProductPage } from './Components/ProductPage';
import { Cart } from './Components/Cart';

// init stripe
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function App() {
  const dispatch = useDispatch();
  
  // ON LOAD
  // Get user-self info & update store
  useEffect(() => {
    let isSubscribed = true;
    const checkUserAuth = async () => {
      try {
        const data = await apiGetUserSelf();
        if(isSubscribed) {
          console.log('# apiGetUserSelf res :', data)
          dispatch(updateUser({
            loggedIn: data.loggedIn,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
            isVerified: data.isVerified,
            addresses: data.addressDetails
          }))
        }
      } catch(err) {
        console.error('# err', err)
      }
    };
    checkUserAuth();
    return () => { isSubscribed = false }
  }, [dispatch]);
  
  // Get user-self cart
  useEffect(() => {
    const checkSelfCartQuantity = async () => {
      try {
        const data = await apiGetSelfCart();
        console.log('# checkSelfCartQuantity data :', data)
      } catch(err) {
        console.error('# err', err)
      }
    }
    checkSelfCartQuantity();
  }, [dispatch])
  
  
  // RESTRICTED: IS LOGGED ?
  const RestrictedRoutes = () => {
    const loggedIn = useSelector(state => state.user.loggedIn)
    const isLogged = () => {
      const user = { loggedIn }
      return user.loggedIn;
    }
    return isLogged() ? (
      <Navigate replace to="/welcome" /> 
    ) : <Outlet />;
  }
  
  return (
    <BrowserRouter>
      <Elements
        stripe={stripePromise}
        // options={stripeOptions}
      >
        <Navbar />
        <Routes>
          {/* PUBLIC */}
          {/* <Route path="*" element={<Navigate replace to="/welcome"/>}/> */}
          <Route path="/welcome" element={<HomePage/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/product">
            <Route path=":productTitle" element={<ProductPage/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
          {/* TEMP */}
          <Route path="/cancel" element={<CheckoutCancel/>}/>
          <Route path="/success" element={<CheckoutSuccess/>}/>
          {/* RESTRICTED */}
          <Route element={<RestrictedRoutes />}>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
          </Route>
          {/* PRIVATE */}
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Elements>
    </BrowserRouter>
  );
}

export default App;

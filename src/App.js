import React, { useEffect } from 'react';
import { 
  // useSelector, 
  useDispatch,
  useSelector,
} from "react-redux";
import {
  updateAuthStatus,
} from './Redux/reducers/user';
import nutritivApi from './Api/nutritivApi';
import HomePage from './Pages/HomePage.js';
import RegisterPage from './Pages/RegisterPage.js';
import LoginPage from './Pages/LoginPage.js';
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  
  // ON LOAD: CHECK IF IS LOGGED & UPDATE STORE
  useEffect(() => {
    let isSubscribed = true;
    const checkUserAuth = async () => {
      try {
        const { data } = await nutritivApi.get(
          '/users/checkJWT',
        )
        if(isSubscribed) {
          console.log('# users/checkJWT res :', data)
          dispatch(updateAuthStatus({
            loggedIn: data.loggedIn
          }))
        }
      } catch(err) {
        console.error('# err', err)
      }
    };
    checkUserAuth()
    return () => { isSubscribed = false }
  }, [dispatch]);
  
  // RESTRICTED: IS LOGGED ?
  const RestrictedRoutes = () => {
    const loggedIn = useSelector(state => state.user.loggedIn)
    const isLogged = () => {
      const user = { loggedIn }
      return user.loggedIn;
    }
    return isLogged() ? <Navigate to="/welcome" /> : <Outlet />;
  }
  
  // TEMP
  function Auth() {
    return (
      <h3>
        <Link to="/auth/login">Login</Link>
        <Outlet />
      </h3>
    )
  }
  
  // TEMP
  function Navbar() {
    return (
      <nav>
        <Link to="/welcome">NUTRITIV</Link>
        <span>----</span>
        <Link to="/register">REGISTER</Link>
        <span>----</span>
        <Link to="/login">LOGIN</Link>
      </nav>
    )
  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="*" element={<Navigate replace to="/welcome"/>}/>
        <Route path="/welcome" element={<HomePage />}/>
        {/* RESTRICTED */}
        <Route element={<RestrictedRoutes />}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
        {/* <Route path="/dashboard" element={<DashboardPage/>}/> */}
        {/* PRIVATE */}
        {/* <Route path="/user" element={<Users/>}>
          <Route index path="*" element={<UserNotFoundPage/>}/>
          <Route path="username" element={<UserProfilePage/>}/>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

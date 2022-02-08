import React, { useEffect } from 'react';
import { 
  // useSelector, 
  useDispatch,
  useSelector,
} from "react-redux";
import {
  updateUser,
} from './Redux/reducers/user';
import { apiGetUser } from './Api/nutritivApi';
import HomePage from './Pages/HomePage.js';
import RegisterPage from './Pages/RegisterPage.js';
import LoginPage from './Pages/LoginPage.js';
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';

function App() {
  const dispatch = useDispatch();

  // ON LOAD: GET USER INFO & UPDATE STORE
  useEffect(() => {
    let isSubscribed = true;
    const checkUserAuth = async () => {
      try {
        const data = await apiGetUser();
        if(isSubscribed) {
          console.log('# users/self res :', data)
          dispatch(updateUser({
            loggedIn: data.loggedIn,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
            isVerified: data.isVerified,
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
    return isLogged() ? <Navigate replace to="/welcome" /> : <Outlet />;
  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        {/* <Route path="*" element={<Navigate replace to="/welcome"/>}/> */}
        <Route path="/welcome" element={<HomePage />}/>
        {/* RESTRICTED */}
        <Route element={<RestrictedRoutes />}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/dashboard" element={<DashboardPage/>}/> */}
        {/* PRIVATE */}
        {/* <Route path="/user" element={<Users/>}> */}
          {/* <Route index path="*" element={<UserNotFoundPage/>}/> */}
          {/* <Route path="username" element={<UserProfilePage/>}/> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

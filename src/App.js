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
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  
  const RestrictedRoutes = () => {
    const loggedIn = useSelector(state => state.user.loggedIn)
    const isLogged = () => {
      const user = { loggedIn }
      return user.loggedIn;
    }
    return isLogged() ? <Navigate to="/welcome" /> : <Outlet />;
  }
  
  // ON LOAD: CHECK IF LOGGEDIN
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { data } = await nutritivApi.get(
          '/users/checkJWT',
        )
        console.log('# users/checkJWT res :', data)
        dispatch(updateAuthStatus({
          loggedIn: data.loggedIn
        }))
      } catch(err) {
        console.error('# err', err)
      }
    };
    checkUserAuth()
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="*" element={<Navigate replace to="/welcome"/>}/>
        <Route path="/welcome" element={<HomePage/>}/>
        {/* <Route path="/dashboard" element={<DashboardPage/>}/> */}
        {/* RESTRICTED */}
        <Route element={<RestrictedRoutes />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>
        {/* PRIVATE */}
        {/* <Route path="/user" element={<Users/>}>
          <Route index path="*" element={<UserNotFoundPage/>}/>
          <Route path="username" element={<UserProfilePage/>}/>
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;

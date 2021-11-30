import React, { useState } from 'react';
import HomePage from './Pages/HomePage.js';
import RegisterPage from './Pages/RegisterPage.js';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

function App() {

  const [token, setToken] = useState();
  
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        {/* <Route path="*" element={<Navigate replace to="/welcome"/>}/> */}
        <Route path="/welcome" element={<HomePage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        {/* <Route path="/brand" element={<BrandPage/>}/> */}
        {/* RESTRICTED */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        {/* PRIVATE */}
        <Route path="/user" element={<Users/>}>
          <Route index path="*" element={<UserNotFoundPage/>}/>
          <Route path="username" element={<UserProfilePage/>}>
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

function useAuth() {
  return false;
}

function UserNotFoundPage() {
  console.log("user not found")
  return (
    <div>
      <p>User not found</p>
    </div>
  )
}

function Users() {
  console.log("users component")
  const auth = useAuth();
  return auth ? <Outlet/> : <Navigate to="/login"/>
}

function UserProfilePage() {
  return (
    <div>
      <h4>USER YOANN</h4>
    </div>
  )
}

function LoginPage() {
  console.log("login page")
  return (
    <div>
      <h2>
        Login page
      </h2>
    </div>
  )
}

function DashboardPage() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that i brought in is: {location.state}</h1>
    </div>
  )
}

function NavigateExample() {
  const navigate = useNavigate();
  const { myValue } = useParams();
  return (
    <div>
      
      {/* WITH BUTTON */}
      
      <button onClick={() => {
        navigate("/dashboard", { state: myValue });
      }}>
        Price
      </button>
      
      {/* WITH LINK */}
      
      <Link to="/dashboard" state={ myValue }>Test Link</Link>
    
    </div>
  )
}

export default App;

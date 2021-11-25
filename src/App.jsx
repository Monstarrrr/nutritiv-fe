import {
  BrowserRouter as 
  Router, Routes, Route, Navigate, Link, NavLink, Outlet, useParams, useLocation,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/myapps" element={<Navigate replace to="/learn" />} />
        <Route path="/learn" element={<Learn/>}>
          <Route path="courses" element={<Courses/>} > 
            <Route path=":courseid" element={<CourseId/>} />
          </Route>
          <Route path="bundles" element={<Bundles/>} />
        </Route>
        {/* <PrivateRoute exact path="/profile" element={<UserProfile/>} />
        <Navigate from="*" to="/" /> */}
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <p>HOME PAGE YO</p>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>
        Learn
      </h1>
      <h4>
        All courses are listed here
      </h4>
      <Link to="/learn/courses">
        --courses--
      </Link>
      <Link to="/learn/bundles">
        --bundle--
      </Link>
      <Outlet />
    </div>
  )
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "NodeJS"];
  const randomCourseList = courseList[Math.floor(Math.random() * courseList.length)]
  
  return (
    <div>
      <h1>Courses</h1>
      <p>course1, course2</p>
      
      <Outlet/>
    </div>
  )
}

function Bundles() {
  return (
    <div>
      <h1>Bundles</h1>
      <p>buuuundlessss</p>
    </div>
  )
}

function CourseId() {
  const {courseid} = useParams();
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  }
  return (
    <div>
      <h2>URL is : {usePathname()}</h2>
      <h2>URL param is : {courseid}</h2>
    </div>
  )
}

export default App;

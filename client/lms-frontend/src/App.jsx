

import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePages';
import AboutUs from './Pages/AboutUs';
import PageNotFound from './Pages/PageNotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CoursesList from './Pages/Course/CoursesList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import RequireAuth from './Components/Auth/RequireAuth';

import CreateCourse from './Pages/Course/CreateCourse';
import CoursesDescription from './Pages/Course/CoursesDescription';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
// import Checkout from './Pages/Payment/Checkout';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CoursesList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>



        <Route path="/*" element={<PageNotFound />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/courses/create" element={<CreateCourse />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>


          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/editprofile' element={<EditProfile />} />
          <Route path='/checkout' element={<Checkout/>}/>
        </Route>
        <Route path="/course/description/" element={<CoursesDescription />} />
      </Routes>

      {/* <Footer/> */}
    </>
  )
}

export default App

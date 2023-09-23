

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

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}></Route>
      <Route path="/about" element = {<AboutUs/>}></Route>
      <Route path="/courses" element = {<CoursesList/>}></Route>
      <Route path="/contact" element = {<Contact/>}></Route>
      <Route path="/denied" element = {<Denied/>}></Route>



      <Route path="/*" element = {<PageNotFound/>}></Route>
      <Route path="/signup" element = {<SignUp/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      <Route element = {<RequireAuth allowedRoles={["ADMIN"]}/>}>
      <Route path="/courses/create" element={<CreateCourse/>}/>
      </Route>
    </Routes>
   
    {/* <Footer/> */}
    </>
  )
}

export default App



import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePages';
import AboutUs from './Pages/AboutUs';
import PageNotFound from './Pages/PageNotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CoursesList from './Pages/Course/CoursesList';
import Contact from './Pages/Contact';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}></Route>
      <Route path="/about" element = {<AboutUs/>}></Route>
      <Route path="/courses" element = {<CoursesList/>}></Route>
      <Route path="/contact" element = {<Contact/>}></Route>
      <Route path="/*" element = {<PageNotFound/>}></Route>
      <Route path="/signup" element = {<SignUp/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
    </Routes>
   
    {/* <Footer/> */}
    </>
  )
}

export default App

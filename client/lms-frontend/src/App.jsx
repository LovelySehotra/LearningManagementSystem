

import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePages';
import AboutUs from './Pages/AboutUs';
import PageNotFound from './Pages/PageNotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}></Route>
      <Route path="/about" element = {<AboutUs/>}></Route>
      <Route path="/*" element = {<PageNotFound/>}></Route>
      <Route path="/signup" element = {<SignUp/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
    </Routes>
   
    {/* <Footer/> */}
    </>
  )
}

export default App

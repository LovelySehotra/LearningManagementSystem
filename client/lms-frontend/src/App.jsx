import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import HomeLayout from './Layouts/HomeLayout';
import HomePage from './Pages/HomePages';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}></Route>
    </Routes>
   
    {/* <Footer/> */}
    </>
  )
}

export default App

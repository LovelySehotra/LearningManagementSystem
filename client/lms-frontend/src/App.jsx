

import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePages';
import AboutUs from './Pages/AboutUs';
import PageNotFound from './Pages/PageNotFound';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}></Route>
      <Route path="/about" element = {<AboutUs/>}></Route>
      <Route path="/*" element = {<PageNotFound/>}></Route>
    </Routes>
   
    {/* <Footer/> */}
    </>
  )
}

export default App

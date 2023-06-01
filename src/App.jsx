import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/auth/signup' element={<Signup/>}/>
        <Route path='/auth/login' element={<Login/>}/>

        <Route path='/' element={<Home/>}/>


        <Route path='/error' element={<Error/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      
    </div>
  )
}

export default App

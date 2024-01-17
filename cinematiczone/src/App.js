import React from 'react'
import Home from './home'
// import Login from './login';
import {Routes, Route,} from "react-router-dom"
import SingleMovie from './SingleMovie'
import Signin from './Signin'
import Login from './Login'
import Review from './Review'
import Error from './Error'
import "./App.css"
import Logout from './Logout'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="movie/:id" element={<SingleMovie/>} />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/review' element={<Review/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="*" element={<Error/>} />
    </Routes>
    </>
  )
}

export default App

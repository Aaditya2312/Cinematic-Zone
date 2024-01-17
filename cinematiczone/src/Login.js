import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
  
    const userLogin = async(e) => {
      e.preventDefault()
      const res = await fetch('/login', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, password
        })
      })
      const data = await res.json()
      if(res.status === 400 || res.status === 422 || !data){
        window.alert("Login failed")
        console.log("Login failed")
      }
      else{
        window.alert("Login Successfull")
        console.log("Login Successfull")
        navigate('/review');
      }
  
    }
    return (
        <div className="sign-in-container">
        <section className='make'>
          <form method='POST'>
          <div className='equilibrium'> 
          <label htmlFor="name">Name:</label>
          <input className='slack'
            type="text"
            name='name'
            id="name"
            placeholder='Your Name'
            value={name}
            onChange={(e)=>{
              setName(e.target.value)
           }}
            required
          />
          </div>
          <div className='equilibrium'>
          <label htmlFor="password">Password:</label>
          <input className='slack'
            type="password"
            name='password'
            id="password"
            placeholder='Your password'
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
           }}
            required
          />
          {/* </div>
          <div className='equilibrium'>
          <label htmlFor="cpassword"> Password:</label>
          <input  className='slack'
            type="password"
            name='cpassword'
            id="cpassword"
            placeholder='confirm password'
            required
          /> */}
           <button type="submit" onClick={userLogin} className='s-btn'>Log In</button>
          </div>
          <NavLink to='/signin' className="extra">I am new here</NavLink>
          <NavLink to='/review' className="extra">Recommend as a user</NavLink>
          </form>
        </section>
      </div>
      )
 
}

export default Login

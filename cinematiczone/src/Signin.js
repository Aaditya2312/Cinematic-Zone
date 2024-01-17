import {React, useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate();
  const [user,setUser] = useState({
    name:"",city:"", password:"", cpassword:""
  })
  let name, value
  const handleChange = (e)=>{
    name = e.target.name
    value = e.target.value

    setUser({...user, [name]:value})
  }
  const PostData = async (e) => {
    e.preventDefault()
    const {name, city, password, cpassword} = user
    const res = await fetch("/signin", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, city, password, cpassword
      })
    })
    const data = await res.json()
    if(res.status === 422 || !data){
      window.alert("Registration failed")
      console.log("Registration failed")
    }
    else{
      window.alert("Registration Successfull")
      console.log("Registration Successfull")
      navigate('/login');
    }

  }
  return (
    <div>
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
          placeholder='Your name'
           value={user.name}
           onChange={handleChange}
          required
        />
        </div>
        <div className='equilibrium'>
        <label htmlFor="city">City:</label>
        <input className='slack'
          type="text"
          name='city'
          id="city"
          placeholder='Your city'
           value={user.city}
           onChange={handleChange}
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
           value={user.password}
           onChange={handleChange}
          required
        />
        </div>
        <div className='equilibrium'>
        <label htmlFor="cpassword">Password:</label>
        <input className='slack'
          type="password"
          name='cpassword'
          id="cpassword"
          placeholder='Confirm password'
           value={user.cpassword}
           onChange={handleChange}
          required
        />
         <button type="submit" onClick={PostData} className='s-btn'>Sign In</button>
        </div>
        <div className=''>
        <NavLink to='/login' className="extra">I am already Registered</NavLink>
        </div>
        </form>
      </section>
    </div>
  )
    </div>
  )
}

export default Signin

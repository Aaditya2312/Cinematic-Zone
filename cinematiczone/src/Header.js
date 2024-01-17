import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='logic'>
    <header>
      <img src="/CinematicZone.png" alt="Website-Logo" className='logo' />
      {/* Add navigation links or other header content here */}
      {/* <h3 style={{color:'Background', marginTop:9}}>Want to recommend? Make sure you are logged in.</h3> */}
      <nav className="nav">
          <ul className='order'> 
            <li className='arrange'>
              <NavLink to="/signin" className="nav-2">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-2">Log In</NavLink>
            </li>
          </ul>
        </nav>
      
    </header>
    </div>
  )
}

export default Header

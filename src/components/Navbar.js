import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/draft">Draft</Link></li>
      </ul>
    </div>
  )
}

export default Navbar

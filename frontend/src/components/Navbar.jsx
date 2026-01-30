import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import Logout from './Logout'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div>
         <nav className='h-20 px-6 py-3 flex items-center justify-between bg-white shadow-md'>
      <div className='flex items-center gap-4'>
        <h1 className='font-bold text-2xl'>My App</h1>
        <NavLink
          to='/home/profile'
          className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}
        >
          Profile
        </NavLink>
      </div>

        <Logout />  
    </nav>
    </div>
  )
}

export default Navbar
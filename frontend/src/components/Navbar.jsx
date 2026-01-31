import React from 'react'
import { NavLink } from 'react-router'
import Logout from './Logout'

const Navbar = () => {
  return (
    <nav className="h-16 px-8 flex items-center justify-between bg-white border-b shadow-sm">

      {/* Left Side */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold tracking-tight text-gray-800">
          Profile Panel
        </h1>

        <NavLink
          to="/home/profile"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition
            ${isActive
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`
          }
        >
          My Profile
        </NavLink>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Fake Avatar Circle (optional) */}
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          P
        </div>

        {/* Logout Button */}
        <div className="hover:scale-105 transition">
          <Logout />
        </div>

      </div>
    </nav>
  )
}

export default Navbar

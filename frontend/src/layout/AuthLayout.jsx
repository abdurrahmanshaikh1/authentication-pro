import React, { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

const AuthLayout = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <div>
        {toggle ? <Register setToggle={setToggle} />: <Login setToggle={setToggle} /> }
    </div>
    // <div className="min-h-screen bg-slate-950 flex justify-center items-center">
    //   <Outlet />
    // </div>
  )
}

export default AuthLayout
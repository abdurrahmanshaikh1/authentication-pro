import React from 'react'
import { removeUser } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=> {
        //logout functionality will be added here
        alert('User logged out successfully')
        dispatch(removeUser())
        navigate('/' , {replace:true})

    }
  return (  
    <div>
        <button onClick={handleLogout} className='bg-red-500 px-4 py-2 rounded-md text-white cursor-pointer'>Logout</button>
    </div>
  )
}

export default Logout
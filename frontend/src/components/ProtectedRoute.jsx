import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const {user} = useSelector((state)=> state.auth);
console.log("user", user)

if(!user){
  return <Navigate to='/' />
}
  return  <Outlet />
  
}

export default ProtectedRoute
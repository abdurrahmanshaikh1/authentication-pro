import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const HomeLayout = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
      <Navbar />
      <div className='px-6 py-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout

import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layout/AuthLayout'
import HomeLayout from '../layout/HomeLayout'
import PublicRoute from '../components/PublicRoute'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/AuthSlice'
import { useEffect } from 'react'
import { axiosInstance } from '../config/axiosInstance'
import ProtectedRoute from '../components/protectedRoute'
import UserPage from '../pages/UserPage'
import Profile from '../components/profile/Profile'
import VerifyEmail from '../pages/VerifyEmail'
import RegisterSuccess from '../pages/RegisterSuccess'

const AppRouter = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        await axiosInstance.get(`/auth/verify-email/${token}`, {
          withCredentials: true,
        });

        let res = await axiosInstance.get('auth/current-user', {
          withCredentials: true
        })
        if (res) {
          dispatch(setUser(res.data.user))
        }
        
      } catch (error) {
        console.log("error in current api", error)
      }
    })();
  }, []);


  let router = createBrowserRouter([
    {
      path: '/',
      element: <PublicRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />
        },
        {
          path: 'verify-email/:token',
          element: <VerifyEmail />
        },
        {
        path: 'register-success',
        element: <RegisterSuccess />
      },
      ],
    },

    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <HomeLayout />,
          children: [
            {
              index: true,
              element: <UserPage />
            },
            {
              path: 'profile',
              element: <Profile />
            }
          ]
        }
      ]
    },


  ])
  return (
    <div><RouterProvider router={router} /></div>
  )
}

export default AppRouter
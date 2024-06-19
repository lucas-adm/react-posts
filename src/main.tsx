import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.scss'

import App from './App.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'
import User from './pages/User.tsx'
import Users from './pages/Users.tsx'
import Post from './pages/Post.tsx'
import Search from './pages/Search.tsx'

import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Confirmation from './pages/Confirmation.tsx'
import Greetings from './pages/Greetings.tsx'

import UserPhoto from './components/page-components/user/UserPhoto.tsx'
import UserEdit from './components/page-components/user/UserEdit.tsx'
import UserDelete from './components/page-components/user/UserDelete.tsx'

import { Provider } from 'react-redux'
import store from './redux/store.ts'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import Auth from './auth.tsx'
import { UserProvider } from './context/UserProvider.tsx'

const router = createHashRouter([
  {
    path: '/',
    element: <Auth><UserProvider><Provider store={store}><App /></Provider></UserProvider></Auth>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/user/:username',
        element: <User />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/user/edit',
        element: <UserEdit />
      },
      {
        path: '/user/photo',
        element: < UserPhoto />
      },
      {
        path: '/user/delete',
        element: < UserDelete />
      },
      {
        path: '/post/:id',
        element: <Post />
      },
      {
        path: '/posts/:username',
        element: <Search />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/confirmation',
    element: <Confirmation />
  },
  {
    path: '/greetings',
    element: <Greetings />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
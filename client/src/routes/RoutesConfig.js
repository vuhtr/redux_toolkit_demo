import { Navigate } from "react-router-dom"

import { Photos } from '../pages/Photos'
import { Signup } from '../pages/Signup'
import { Login } from '../pages/Login'
import { Profile } from "../pages/Profile"
import { NotFound } from "../pages/NotFound"

import pathNames  from "./pathNames"

const RoutesConfig = [
  {
    path: pathNames.HOME,
    element: <Navigate to={pathNames.PHOTO} />,
  },
  {
    path: pathNames.PHOTO,
    element: <Photos />,
  },
  {
    path: pathNames.LOGIN,
    element: <Login />,
  },
  {
    path: pathNames.SIGNUP,
    element: <Signup />,
  },
  {
    path: pathNames.PROFILE,
    element: <Profile />,
  },
  {
    path: pathNames.NOT_FOUND,
    element: <NotFound />,
  }
]

export default RoutesConfig

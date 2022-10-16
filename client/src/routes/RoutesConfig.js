import { Navigate } from "react-router-dom"

import { Photos } from "../pages/Photos"
import { Signup } from "../pages/Signup"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { NotFound } from "../pages/NotFound"

import pathNames from "./pathNames"
import { PhotosAddEdit } from "pages/PhotosAddEdit"

const RoutesConfig = [
    {
        path: pathNames.HOME,
        element: <Navigate to={pathNames.PHOTOS} />,
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
        path: pathNames.PHOTOS,
        element: <Photos />,
    },
    {
        path: pathNames.PHOTOS_ADD_EDIT,
        element: <PhotosAddEdit isAddMode={true} />,
    },
    {
        path: pathNames.PROFILE,
        element: <Profile />,
    },
    {
        path: pathNames.NOT_FOUND,
        element: <NotFound />,
    },
]

export default RoutesConfig

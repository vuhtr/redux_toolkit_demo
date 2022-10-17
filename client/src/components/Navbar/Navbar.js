import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Container } from "@mui/material"

import { useSelector, useDispatch } from "react-redux"
import { logout } from "redux/userSlice"

import pathNames from "routes/pathNames"

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false)

    const navigate = useNavigate()
    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()

    const handleProfile = () => {
        navigate(`${pathNames.PROFILE}/${user.id}`)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate(pathNames.HOME)
    }

    return (
        <div className="navbar">
            <Container className="navbar__container">
                <Link to="/" className="navbar__logo">
                    Photo Gallery
                </Link>

                {user.email ? (
                    <div className="navbar__user">
                        <p className="navbar__user__name">{user.fullName}</p>
                        <div
                            className="navbar__user__avatar"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <img src={user.avatar} alt="user avatar" />
                            {showDropdown && (
                                <div className="navbar__user__dropdown">
                                    <ul>
                                        <li onClick={handleProfile}>Profile
                                        </li>
                                        <li onClick={handleLogout}>Log out</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <ul className="navbar__link">
                        <li>
                            <Link to={pathNames.LOGIN}>Log In</Link>
                        </li>
                        <li>
                            <Link to={pathNames.SIGNUP}>Sign Up</Link>
                        </li>
                    </ul>
                )}

                {/* <ul className="navbar__link">
                        <li>
                            <Link to={pathNames.LOGIN}>Log In</Link>
                        </li>
                        <li>
                            <Link to={pathNames.SIGNUP}>Sign Up</Link>
                        </li>
                    </ul> */}

                {/* User has logged out */}

                {/* User are logging in */}
                {/* <ul className="navbar__link">
                <li><Link to="/">Profile</Link></li>
            </ul> */}
            </Container>
        </div>
    )
}

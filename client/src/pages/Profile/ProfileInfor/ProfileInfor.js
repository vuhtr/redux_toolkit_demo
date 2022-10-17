import React, { useState } from "react"

import { useDispatch } from "react-redux"

import { Button } from "@mui/material"

import { NotFound } from "pages/NotFound"
import { ProfileEdit } from "./ProfileEdit"

import { updateInfor } from "redux/userSlice"
import userApi from "api/userApi"


export default function ProfileInfor({ userInfor, canEdit }) {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)

    const handleSaveProfile = async (data) => {
        const dataSent = {
            // ...userInfor,
            ...data,
        }
        const response = await userApi.update(userInfor.id, dataSent)
        dispatch(updateInfor(response))
        setIsEdit(false)
    }

    return (
        <>
            {userInfor ? (
                <div className="profile-infor">
                    {!isEdit ? (
                        <>
                            <div className="profile-infor__avatar">
                                <img src={userInfor.avatar} alt="user avatar" />
                            </div>

                            <div className="profile-infor__content">
                                <div className="profile-infor__title">
                                    <h2>{userInfor.fullName}</h2>
                                    {canEdit && (
                                        <Button
                                            variant="outlined"
                                            onClick={() => setIsEdit(true)}
                                        >
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                                <div className="profile-infor__detail">
                                    <p>
                                        <span>Full name:</span> {userInfor.fullName}
                                    </p>
                                    <p>
                                        <span>Email:</span> {userInfor.email}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ProfileEdit
                            userInfor={userInfor}
                            handleSaveProfile={handleSaveProfile}
                        />
                    )}
                </div>
            ) : (
                <NotFound />
            )}
        </>
    )
}

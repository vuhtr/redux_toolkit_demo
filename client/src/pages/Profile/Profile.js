import { Container } from "@mui/material"
import userApi from "api/userApi"
import { TabsZone } from "components/TabsZone"
import { NotFound } from "pages/NotFound"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ProfileInfor from "./ProfileInfor/ProfileInfor"

export default function Profile() {
    // const navigate = useNavigate()
    const loggedInUser = useSelector((state) => state.user.userInfo)

    // Get userId from search params, then find the user obj by id if this 
    // id is different from the logged in user
    const targetUserId = +useParams().userId
    const [targetUser, setTargetUser] = useState(null)
    const isWatchingOwnProfile = loggedInUser.id === targetUserId

    useEffect(() => {
        const fetchUser = async () => {
            const response = await userApi.get(targetUserId)
            setTargetUser(response)
        }

        if (!isWatchingOwnProfile) fetchUser()
    }, [targetUserId, isWatchingOwnProfile])

    // Specify tabs to display
    let tabLabels = []
    let tabContents = []
    if (isWatchingOwnProfile) {
        tabLabels = ["Information", "Change password", "Something else"]
        tabContents = [
            <ProfileInfor userInfor={loggedInUser} canEdit={true} />,
            <div>Change password</div>,
            <div>Something else</div>,
        ]
    } else {
        tabLabels = ["Information"]
        tabContents = [<ProfileInfor userInfor={targetUser} canEdit={false} />]
    }

    return (
        <>
            {loggedInUser || targetUser ? (
                <div className="profile">
                    <Container className="profile__container">
                        <h1 className="profile__title">Your Profile</h1>

                        <div className="profile__tabs">
                            <TabsZone
                                orientation="horizontal"
                                tabLabels={tabLabels}
                                tabPanels={tabContents}
                            />
                        </div>
                    </Container>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    )
}

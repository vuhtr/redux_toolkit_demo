import React, { useEffect } from "react"
import { Container } from "@mui/material"

import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { PhotoCard } from "./PhotoCard"

import photosApi from "api/photosApi"
import pathNames from "routes/pathNames"

import { setPhotos } from "redux/photosSlice"

export default function Photos() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.userInfo)
    const photos = useSelector((state) => state.photos)

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await photosApi.getUserPhotos({ userId: user.id })
            dispatch(setPhotos(response))
        }

        if (user.id)
            fetchPhotos()

        console.log('Call API to get user\'s photos')
    }, [user.id])

    return (
        <div className="photos">
            <Container className="photos__container">
                {user.email ? (
                    <>
                        <h1>Greetings {user.fullName}!</h1>

                        <div className="photos__add">
                            <Link to={pathNames.PHOTOS_ADD_EDIT}>Add a new photo</Link>
                        </div>

                        {photos.length > 0 ? (
                            <div className="photos__grid">
                                {photos.map((photo) => (
                                    <PhotoCard key={photo.id} photo={photo} />
                                ))}
                            </div>
                        ) : (
                            <div className="photos__empty">
                                <img src="https://assets.materialup.com/uploads/8b0ec3cb-a32d-40bb-b17d-66b9fd744172/attachment.jpg" />
                                <p>You have no photos</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="photos__welcome">
                        <h1>Welcome to Photo Gallery</h1>

                        <img src="https://picsum.photos/id/222/300/300" alt="welcome" />
                    </div>
                )}
            </Container>
        </div>
    )
}

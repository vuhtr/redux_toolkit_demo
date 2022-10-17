import React from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Button, Container } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { addPhoto, updatePhoto } from "redux/photosSlice"
import photosApi from "api/photosApi"

import { FormSelect, FormTextField, FormSubmitAlert } from "components/Form"
import { PhotoPicker } from "components/PhotoPicker"

import { PHOTOS_CATEGORY } from "constants/photoCategories"

import pathNames from "routes/pathNames"

import { NotFound } from "pages/NotFound"


export default function PhotosAddEdit() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user.userInfo.id)

    // Initial value for fields
    const initialValue = {
        title: "",
        category: "",
        photoUrl: "",
    }
    // If this is in edit mode, find the photo by id
    // const [searchParams] = useSearchParams()
    // const photoId = searchParams.get("photoId")
    const { photoId } = useParams()
    console.log(photoId)
    const photo = useSelector(
        (state) =>
            state.photos.find((photo) => photo.id === +photoId && photo.userId === userId) // +x means convert x to number
    )

    const isEditMode = photo && userId

    if (isEditMode) {
        initialValue.title = photo.title
        initialValue.category = photo.category
        initialValue.photoUrl = photo.photoUrl
    }

    // Form validation
    const schema = yup
        .object({
            title: yup.string().required("Please enter photo's title"),
            category: yup.string().required("Please choose a category"),
            photoUrl: yup.string().required("Please random a photo"),
        })
        .required()

    // Initialize React Hook Form
    const {
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValue,
    })

    const onSubmit = async (data) => {
        const dataSent = {
            ...data,
            userId: userId,
        }
        
        try {
            if (isEditMode) {
                const response = await photosApi.update(photoId, dataSent)
                dispatch(updatePhoto(response))
                navigate(pathNames.PHOTOS)
            } else {
                const response = await photosApi.post(dataSent)
                dispatch(addPhoto(response))
                navigate(pathNames.PHOTOS)
            }
        } catch {
            setError("submit", {
                type: "manual",
                message: "Something return from backend",
            })
        }
    }

    return (
        <div className="photos-add-edit">
            {userId ? (
                <Container className="photos-add-edit__container">
                    <h1>The photo you uploads will be very interesting!</h1>

                    <form
                        className="photos-add-edit__form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormTextField
                            name="title"
                            control={control}
                            errorField={errors.title || errors.submit}
                            errorText={errors.title}
                            placeHolder="Photo's title"
                            initialValue={initialValue.title}
                        />

                        <FormSelect
                            name="category"
                            control={control}
                            errorField={errors.category || errors.submit}
                            errorText={errors.category}
                            options={PHOTOS_CATEGORY}
                            placeHolder="Photo's category"
                            initialValue={initialValue.category}
                        />

                        <PhotoPicker
                            name="photoUrl"
                            control={control}
                            setValue={setValue}
                            errorText={errors.photo}
                            initialValue={initialValue.photoUrl}
                        />

                        {errors.submit && (
                            <FormSubmitAlert
                                text={errors.submit.message}
                                onClose={() => clearErrors("submit")}
                            />
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            className="photos-add-edit__btn"
                        >
                            {isEditMode ? "Update photo" : "Add to album"}
                        </Button>
                    </form>
                </Container>
            ) : (
                <NotFound />
            )}
        </div>
    )
}

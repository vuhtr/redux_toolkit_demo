import React from "react"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Button } from "@mui/material"

import { FormTextField, FormSubmitAlert } from "components/Form"
import { PhotoPicker } from "components/PhotoPicker"

export default function ProfileEdit({ userInfor, handleSaveProfile }) {
    const initialValue = {
        fullName: userInfor.fullName,
        email: userInfor.email,
        avatar: userInfor.avatar,
    }

    const schema = yup
        .object({
            fullName: yup.string().required("Please enter your full name"),
            email: yup.string().required("Please enter your email"),
            avatar: yup.string().required("Please random your avatar"),
        })
        .required()

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

    // Call API
    const onSubmit = async (data) => {
        try {
            handleSaveProfile(data)
        } catch {
            setError("saveInfor", {
                type: "manual",
                message: "Something return from backend",
            })
        }
    }

    return (
        <div className="profile-edit">
            <form className="profile-edit__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="profile-edit__top">
                    <div className="profile-edit__avatar">
                        <PhotoPicker
                            name="avatar"
                            control={control}
                            setValue={setValue}
                            errorText={errors.photo}
                            initialValue={initialValue.avatar}
                        />
                    </div>

                    <div className="profile-edit__infor">
                        <FormTextField
                            name="fullName"
                            control={control}
                            errorField={errors.fullName || errors.saveInfor}
                            errorText={errors.fullName}
                            placeHolder="Full name"
                        />

                        <FormTextField
                            name="email"
                            control={control}
                            errorField={errors.email || errors.saveInfor}
                            errorText={errors.email}
                            placeHolder="Email"
                        />
                    </div>
                </div>

                <div className="profile-edit__bottom">
                    {errors.saveInfor && (
                        <FormSubmitAlert
                            text={errors.saveInfor.message}
                            onClose={() => clearErrors("saveInfor")}
                        />
                    )}

                    <Button variant="contained" className="signup__btn" type="submit">
                        Save Profile
                    </Button>
                </div>
            </form>
        </div>
    )
}

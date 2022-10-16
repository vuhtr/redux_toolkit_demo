import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@mui/material"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { FormTextField } from "components/Form"
import { FormSubmitAlert } from "components/Form"

import { useDispatch } from "react-redux"
import { login } from "redux/userSlice"

import userApi from "api/userApi"
import pathNames from "routes/pathNames"

export default function Signup() {
    const schema = yup
        .object({
            fullName: yup.string().required("Please enter your full name"),
            email: yup.string().required("Please enter your email"),
            password: yup
                .string()
                .required("Please enter your password")
                .min(6, "Password must be at least 6 characters"),
            confirmPassword: yup
                .string()
                .required("Please confirm your password")
                .oneOf([yup.ref("password"), null], "Passwords must match"),
        })
        .required()

    const {
        control,
        setError,
        clearErrors,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Call API
    const onSubmit = async (data) => {
        try {
            // remove confirmPassword from data
            const { confirmPassword, ...rest } = data
            const response = await userApi.signup(rest)
            dispatch(login(response))
            navigate(pathNames.HOME)
        } catch {
            setError("signup", {
                type: "manual",
                message: "Something return from backend",
            })
        }
    }

    return (
        <div className="signup">
            <div className="signup__container">
                <h2>Sign Up</h2>

                <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
                    <FormTextField
                        name="fullName"
                        control={control}
                        errorField={errors.fullName || errors.signup}
                        errorText={errors.fullName}
                        placeHolder="Full name"
                    />

                    <FormTextField
                        name="email"
                        control={control}
                        errorField={errors.email || errors.signup}
                        errorText={errors.email}
                        placeHolder="Email"
                    />

                    <FormTextField
                        name="password"
                        type="password"
                        control={control}
                        errorField={errors.password || errors.signup}
                        errorText={errors.password}
                        placeHolder="Password"
                    />

                    <FormTextField
                        name="confirmPassword"
                        type="password"
                        control={control}
                        errorField={errors.confirmPassword || errors.signup}
                        errorText={errors.confirmPassword}
                        placeHolder="Confirm password"
                    />

                    {errors.signup && (
                        <FormSubmitAlert
                            text={errors.signup.message}
                            onClose={() => clearErrors("signup")}
                        />
                    )}

                    <Button variant="contained" className="signup__btn" type="submit">
                        Join Welance
                    </Button>
                </form>

                <div className="signup__swap">
                    <p>Already have an account? <Link to={pathNames.LOGIN}>Log In!</Link></p>
                </div>
            </div>
        </div>
    )
}

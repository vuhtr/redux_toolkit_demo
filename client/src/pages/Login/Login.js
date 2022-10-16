import { useNavigate } from "react-router-dom"

import { Button } from "@mui/material"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { FormTextField } from "components/FormTextField"
import { FormSubmitAlert } from "components/FormSubmitAlert"

import { login } from "redux/userSlice"
import { useDispatch } from "react-redux"

import userApi from "api/userApi"

import pathNames from "routes/pathNames"

export default function Login() {
    const schema = yup
        .object({
            email: yup.string().required("Please enter your email"),
            password: yup.string().required("Please enter your password"),
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

    // Redux state
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Call API to login
    const onSubmit = async (data) => {
        try {
            const response = await userApi.login(data)
            dispatch(login(response))
            navigate(pathNames.HOME)
        } catch {
            setError("login", {
                type: "manual",
                message: "Invalid email or password",
            })
        }
    }

    console.log(errors)

    return (
        <div className="login">
            <div className="login__container">
                <h2>Log In</h2>

                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <FormTextField
                        name="email"
                        control={control}
                        errorField={errors.email || errors.login}
                        errorText={errors.email}
                        placeHolder="Email"
                    />

                    <FormTextField
                        name="password"
                        type="password"
                        control={control}
                        errorField={errors.password || errors.login}
                        errorText={errors.password}
                        placeHolder="Password"
                    />

                    {errors.login && (
                        <FormSubmitAlert
                            text={errors.login.message}
                            onClose={() => clearErrors("login")}
                        />
                    )}

                    <Button variant="contained" className="login__btn" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

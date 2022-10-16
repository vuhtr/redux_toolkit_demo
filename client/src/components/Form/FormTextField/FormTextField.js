import React from "react"
import { Controller } from "react-hook-form"
import { FormControl, TextField } from "@mui/material"
import { FormErrorMsg } from "components/Form";

export default function FormTextField({
    name,
    type,
    control,
    errorField,
    errorText,
    placeHolder,
    initialValue='',
}) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue}
            render={({ field }) => (
                <FormControl className='form-text-field'>
                    <TextField
                        {...field}
                        type={type}
                        error={errorField ? true : false}
                        variant="standard"
                        className="form-text-field__input"
                        placeholder={placeHolder}
                    />

                    {errorText && (
                        <FormErrorMsg msg={errorText.message} />
                    )}
                </FormControl>
            )}
        />
    )
}

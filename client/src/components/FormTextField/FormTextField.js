import React from "react"
import { Controller } from "react-hook-form"
import { FormControl, TextField } from "@mui/material"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function FormTextField({
    name,
    type,
    control,
    errorField,
    errorText,
    placeHolder,
}) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
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
                        <div className="form-text-field__error">
                            <ReportProblemIcon />
                            <p>{errorText.message}</p>
                        </div>
                    )}
                </FormControl>
            )}
        />
    )
}

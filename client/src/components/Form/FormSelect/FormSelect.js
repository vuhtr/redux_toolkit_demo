import React from "react"
import { Controller } from "react-hook-form"
import { FormErrorMsg } from "components/Form"
import Select from "react-select"

export default function FormSelect({
    name,
    control,
    errorField,
    errorText,
    options,
    placeHolder,
    initialValue='',
}) {
    const selectStyles = (error) => ({
        control: (provided) => ({
            ...provided,
            borderColor: error ? "red !important" : "#cccccc",
        }),
    })

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue}
            render={({ field }) => {
                return (
                    <div className="form-select">
                        <Select
                            styles={selectStyles(errorField)}
                            ref={field.ref}
                            placeholder={placeHolder}
                            value={options.find((option) => option.value === field.value)}
                            onChange={(val) => field.onChange(val.value)}
                            className="form-select__select"
                            options={options}
                        />
                        {errorText && <FormErrorMsg msg={errorText.message} />}
                    </div>
                )
            }}
        />
    )
}

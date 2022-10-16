import { Button } from "@mui/material"
import { Controller } from "react-hook-form"

import React, { useState } from "react"
import { FormErrorMsg } from "components/Form"

export default function PhotoPicker({
    name,
    control,
    setValue,
    errorText,
    initialValue,
}) {
    const [photoUrl, setPhotoUrl] = useState(initialValue)

    const getRandomPhotoUrl = () => {
        const randomId = Math.trunc(Math.random() * 2000)
        return `https://picsum.photos/id/${randomId}/300/300`
    }

    const handlePhotoPicker = (e) => {
        const photoUrl = getRandomPhotoUrl()
        setPhotoUrl(photoUrl)
        setValue(name, photoUrl)
    }

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <div className="photo-picker">
                    <div className="photo-picker__btn">
                        <Button variant="contained" onClick={handlePhotoPicker}>
                            Random a photo
                        </Button>
                    </div>

                    {photoUrl && (
                        <img
                            className="photo-picker__photo"
                            src={photoUrl}
                            alt="Ooops ... not found. Please click random again!"
                            onError={handlePhotoPicker}
                        />
                    )}

                    {errorText && <FormErrorMsg msg={errorText.message} />}
                </div>
            )}
        />
    )
}

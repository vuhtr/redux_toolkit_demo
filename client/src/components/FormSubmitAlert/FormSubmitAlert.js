import React from "react"
import ErrorIcon from '@mui/icons-material/Error'
import CloseIcon from '@mui/icons-material/Close';

export default function FormErrorText({text, onClose}) {
    return (
        <div className="form-submit-alert">
            <ErrorIcon />
            <p className="form-submit-alert__text">
                {text}
            </p>
            <div className="form-submit-alert__close" onClick={onClose}>
                <CloseIcon />
            </div>            
        </div>
    )
}

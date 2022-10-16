import React from "react"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function FormErrorMsg({ msg }) {
    return (
        <div className="form-error-msg">
            <ReportProblemIcon />
            <p>{msg}</p>
        </div>
    )
}

import React, { useState } from "react"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"

import { capitalize } from 'utils/utils'

export default function PhotoCard({ photo }) {
    const [isHover, setIsHover] = useState(false)

    return (
        <div className="photoCard"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                className="photoCard__img"
                src={photo.photoUrl}
                alt=""
            />

            {isHover && (
                <div className={`photoCard__overlay ${isHover && 'photoCard__overlay--show'}`}>
                    <p className="photoCard__title">{photo.title}</p>
                    <div className="photoCard__bottom">
                        <p className="photoCard__category">{capitalize(photo.category)}</p>
                        <div className="photoCard__action">
                            <ModeEditIcon />
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

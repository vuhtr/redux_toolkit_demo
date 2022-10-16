import { createSlice } from "@reduxjs/toolkit"

const photoSlice = createSlice({
    name: "photoSlice",
    initialState: [],
    reducers: {
        setPhotos: (state, action) => {
            return action.payload
        },
        addPhoto: (state, action) => {
            state.push(action.payload)
        },
        removePhoto: (state, action) => {
            return state.filter((photo) => photo.id !== action.payload.id)
        },
        editPhoto: (state, action) => {
            const photoIndex = state.findIndex((photo) => photo.id === action.payload.id)
            if (photoIndex >= 0) {
                state[photoIndex] = action.payload
            }
        }
    },
})

const { reducer, actions } = photoSlice
export const { setPhotos, addPhoto, removePhoto, editPhoto } = actions
export default reducer

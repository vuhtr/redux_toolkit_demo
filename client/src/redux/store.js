import { configureStore } from "@reduxjs/toolkit"
import photoReducer from "redux/photosSlice"
import userReducer from "redux/userSlice"

const rootReducer = {
    photos: photoReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store

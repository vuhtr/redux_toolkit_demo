import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        accessToken: null,
        userInfo: {},
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.userInfo = action.payload.user
        },

        logout: (state, action) => {
            state.accessToken = null
            state.userInfo = {}
        },
    },
})

const { reducer, actions } = userSlice
export const { login, logout } = actions
export default reducer

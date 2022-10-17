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

        updateInfor: (state, action) => {
            state.userInfo = action.payload
        }
    },
})

const { reducer, actions } = userSlice
export const { login, logout, updateInfor } = actions
export default reducer

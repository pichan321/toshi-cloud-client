import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "User",
    initialState: {
        uuid: "",
        email: "",
        username: "",
        password: "",
        isLoggedIn: false,
        token: "",
    },
    reducers: {
        updateUuid: (state, action) => {
            state.uuid = action.payload
        },
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updateUsername: (state, action) => {
            state.username = action.payload
        },
        updatePassword: (state, action) => {
            state.password = action.payload
        },
        updateIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
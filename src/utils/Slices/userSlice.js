import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "User",
    initialState: {
        metadata: null,
        isLoggedIn: false,
    },
    reducers: {
        updateMetadata: (state, action) => {
            state.metadata = action.payload
        },
        updateIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
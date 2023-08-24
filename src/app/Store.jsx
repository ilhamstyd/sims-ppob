// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/Slice"
import profileReducer from "../features/ProfileSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile:profileReducer,
        // Other reducers...
    },
});

export default store;

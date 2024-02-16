import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice/UserSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;


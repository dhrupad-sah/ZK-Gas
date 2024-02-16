import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
        },
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
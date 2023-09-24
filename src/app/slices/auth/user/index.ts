import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    name?: string;
    lastName?: string;
    email?: string;
    id?: string;
} | null;


const userSlice = createSlice({
    name: 'userState',
    initialState: null as UserState,
    reducers: {
        handleUserLogin: (state, action) => {

            state = action.payload;

            localStorage.setItem('npmu-user', JSON.stringify(state));
            return state;
        },
        getUserInfo: (state) => {
            return state;
        }
    },
});

export const { handleUserLogin, getUserInfo } = userSlice.actions;

export default userSlice.reducer;
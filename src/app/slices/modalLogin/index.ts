import { createSlice } from '@reduxjs/toolkit';


interface LoginModalState {
    isOpen: boolean;
}

const initialState: LoginModalState = {
    isOpen: false,
};

const counterSlice = createSlice({
    name: 'loginModal',
    initialState,
    reducers: {
        handleLoginModalState: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { handleLoginModalState } = counterSlice.actions;

export default counterSlice.reducer;
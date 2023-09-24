import { createSlice } from '@reduxjs/toolkit';

interface LoginModalState {
    isOpen: boolean;
}

const initialState: LoginModalState = {
    isOpen: false,
};

const createSliceModal = createSlice({
    name: 'createModal',
    initialState,
    reducers: {
        handleCreateModalState: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { handleCreateModalState } = createSliceModal.actions;

export default createSliceModal.reducer;
import { configureStore } from '@reduxjs/toolkit';

import ModalLogin from '@/app/slices/modalLogin';
import ModalCreate from '@/app/slices/modalCreate';
import UserState from '@/app/slices/auth/user';

const store = configureStore({
    reducer: {
        modalLoginState: ModalLogin,
        modalCreateState: ModalCreate,
        userState: UserState,
    },
});
export default store;
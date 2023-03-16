import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './RegisterSlice';

export const store = configureStore({
    reducer: {
        register: registerReducer
    }
});

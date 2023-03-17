import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStep: 1,
    userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
};
const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.currentStep++;
        },
        prevStep: (state) => {
            state.currentStep--;
        },
        setUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        }
    }
});

export const { nextStep, prevStep, setUserData, setCurrentStep } = registerSlice.actions;
export default registerSlice.reducer;   

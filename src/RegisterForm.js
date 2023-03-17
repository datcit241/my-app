import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setUserData, setCurrentStep } from './RegisterSlice';
import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { currentStep, userData } = useSelector((state) => state.register);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });

    const onSubmit = (event) => {
        console.log('Submitted', userData);
        dispatch(setUserData({ firstName: "", lastName: "", email: "", password: "" }));
        dispatch(setCurrentStep(1));
        reset();
    };

    const handleChanges = (event) => {
        const { name, value } = event.target;
        dispatch(setUserData({ [name]: value }));
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} >
                {currentStep === 1 && (
                    <div>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            {...register("firstName", { required: true })}
                            sx={{ margin: '10px' }}
                            error={Boolean(errors.firstName)}
                            onChange={handleChanges}
                            helperText={errors.firstName ? "This field is required" : ""}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            {...register("lastName", { required: true })}
                            sx={{ margin: '10px' }}
                            error={Boolean(errors.lastName)}
                            onChange={handleChanges}
                            helperText={errors.lastName ? "This field is required" : ""}
                        />
                        <Button disabled={!isValid} variant="contained" onClick={() => dispatch(nextStep())} sx={{ margin: '20px' }} >Next</Button>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <TextField
                            label="Email"
                            variant="outlined"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                            sx={{ margin: '10px' }}
                            error={Boolean(errors.email)}
                            onChange={handleChanges}
                            helperText={errors.email ? "Invalid email address" : ""} />
                        <TextField
                            label="Password"
                            variant="outlined"
                            {...register("password", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            })}
                            sx={{ margin: '10px' }}
                            error={Boolean(errors.password)}
                            onChange={handleChanges}
                            helperText={errors.password ? <div>
                                Password must be at least 8 characters long <br />
                                contain at least one lowercase letter,<br /> one uppercase letter, and one number
                            </div> : ""}
                        />
                        <Button variant="contained" onClick={() => dispatch(prevStep())} sx={{ margin: '20px' }} >Previous</Button>
                        <Button disabled={!isValid} type='submit' variant="contained" sx={{ margin: '20px' }}>Submit</Button>
                    </div>
                )}

            </form>
        </div>
    )
}

export default RegisterForm;
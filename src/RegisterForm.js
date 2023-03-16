import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, setUserData } from './RegisterSlice';
import React from 'react'

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { currentStep, userData } = useSelector((state) => state.register);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted', userData);

    };

    const handleChanges = (event) => {
        const { name, value } = event.target;
        dispatch(setUserData({ [name]: value }));
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} >
                {currentStep === 1 && (
                    <div>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            onChange={handleChanges}
                            value={userData.firstName}
                            name="firstName"
                            sx={{ margin: '10px' }}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            onChange={handleChanges}
                            value={userData.lastName}
                            name="lastName"
                            sx={{ margin: '10px' }}
                        />
                        <Button variant="contained" onClick={() => dispatch(nextStep())} sx={{ margin: '20px' }} >Next</Button>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={handleChanges}
                            value={userData.email}
                            name="email"
                            sx={{ margin: '10px' }} />
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            value={userData.password}
                            onChange={handleChanges}
                            sx={{ margin: '10px' }}
                        />
                        <Button variant="contained" onClick={() => dispatch(prevStep())} >Previous</Button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default RegisterForm;
import {Button, TextField} from '@mui/material';
import React from 'react';
import s from "./registration.module.scss"

export const Registration = () => {
    return (
        <div className={s.registrationContainer}>
            <div className={s.label}>
                Sign Up
            </div>
            <TextField id="outlined-basic" label="Email" variant="outlined" sx={{p: 1}}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" sx={{p: 1}}/>
            <TextField id="outlined-basic" label="Confirm password" variant="outlined" sx={{p: 1}}/>
            <Button variant="outlined">Sign Up</Button>
        </div>
    );
};


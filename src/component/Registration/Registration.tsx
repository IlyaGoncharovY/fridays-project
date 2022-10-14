import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import s from "./registration.module.scss"

export const Registration = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            confirmPassword: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm()
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.registrationContainer}>
                    <div className={s.label}>
                        Sign Up
                    </div>

                    <TextField
                        id={"email"}
                        type={"email"}
                        label="Email"
                        variant="outlined"
                        sx={{p: 1}}
                        {...formik.getFieldProps("email")}
                    />
                    <TextField
                        id={"password"}
                        label="Password"
                        variant="outlined"
                        sx={{p: 1}}
                        {...formik.getFieldProps("password")}
                    />
                    <TextField
                        id={"confirmPassword"}
                        label="Confirm password"
                        variant="outlined"
                        sx={{p: 1}}
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    <Button type={"submit"} variant="outlined">Sign Up</Button>
                </div>
            </form>
        </>
    );
};


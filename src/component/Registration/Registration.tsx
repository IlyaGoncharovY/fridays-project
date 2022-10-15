import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import {useAppDispatch, useAppSelector } from '../../bll/hook/hook';
import s from "./registration.module.scss"

type formikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const Registration = () => {

    const subscribe = useAppSelector(store => store.registration.subscribe)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            confirmPassword: ""
        },
        validate: (values) => {

            const errors: formikErrorType = {}

            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }

            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 5) {
                errors.password = "Invalid password"
            }

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "passwords don't match"
            }

            return errors
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
                    {formik.touched.email && <div>{formik.errors.email}</div>}
                    <TextField
                        id={"password"}
                        type={"password"}
                        label="Password"
                        variant="outlined"
                        sx={{p: 1}}
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && <div>{formik.errors.password}</div>}
                    <TextField
                        id={"confirmPassword"}
                        type={"password"}
                        label="Confirm password"
                        variant="outlined"
                        sx={{p: 1}}
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.touched.confirmPassword && <div>{formik.errors.confirmPassword}</div>}
                    <Button type={"submit"} variant="outlined">Sign Up</Button>
                </div>
            </form>
        </>
    );
};


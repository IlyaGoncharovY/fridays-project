import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import {Navigate} from 'react-router-dom';
import {userDataType} from '../../api/regApi';
import {useAppDispatch, useAppSelector} from '../../bll/hook/hook';
import {regTC} from '../../bll/reducers/registration-Reducer';
import s from "./registration.module.scss"

type formikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const Registration = () => {

    const registered = useAppSelector(store => store.registration.registered)
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
            } else if (values.password.length < 9) {
                errors.password = "the password must contain at least 9 characters"
            }

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "passwords don't match"
            }

            return errors
        },
        onSubmit: (values: userDataType) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(regTC(values))
            formik.resetForm()
        },
    });

    if (registered) {
        return <Navigate to={"/organization"}/>
    }

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
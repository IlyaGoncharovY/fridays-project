import React from 'react';
import {Button, Input} from '@mui/material';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {userDataType} from '../../api/regApi';
import {useAppDispatch, useAppSelector} from '../../bll/hook/hook';
import {regTC} from '../../bll/reducers/registration-Reducer';
import s from "./registration.module.scss";

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
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.registrationContainer}>
                    <div className={s.label}>
                        Sign Up
                    </div>

                    <Input
                        id={"email"}
                        type={"email"}
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && <div>{formik.errors.email}</div>}
                    <Input
                        id={"password"}
                        type={"password"}
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && <div>{formik.errors.password}</div>}
                    <Input
                        id={"confirmPassword"}
                        type={"password"}
                        placeholder="Confirm password"
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.touched.confirmPassword && <div>{formik.errors.confirmPassword}</div>}
                    <Button type={"submit"} variant="outlined">Sign Up</Button>
                    <div className={s.label}>
                        <h4>Already have an account?</h4>
                        <NavLink to="/login">{registered ? "Return to login" : "Sign In"}</NavLink>
                    </div>
                </div>
            </form>
        </>
    );
};
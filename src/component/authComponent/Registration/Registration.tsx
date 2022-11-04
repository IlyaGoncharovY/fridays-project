import React, {useState} from 'react';
import {Box, Button, FormGroup, Grid, Paper, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../common/hook/hook';
import {regTC} from '../../../bll/reducers/regReducer';
import s from "./Registration.module.scss";
import {ErrorMessage} from '../../../common/SnackBar/Snackbar';
import {RegDataType} from "../../../api/regApi";
import {PATH} from "../../../utils/path";
import VisibilityIcon from '@mui/icons-material/Visibility';

type formikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const Registration = () => {

    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowConfirm, setIsShowConfirm] = useState(false)
    const isRegistered = useAppSelector(store => store.registration.registered)
    const isLogin = useAppSelector(store => store.login.isLoggedIn)
    const dispatch = useAppDispatch()

    function showPassHandler() {
        setIsShowPass(!isShowPass)
    }

    function showConfirmHandler() {
        setIsShowConfirm(!isShowConfirm)
    }

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
        onSubmit: (values: RegDataType) => {
            dispatch(regTC(values))
            formik.resetForm()
        },
    });

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={"center"}>
                <Paper elevation={3}>
                    <Box className={s.box} component='form' onSubmit={formik.handleSubmit} sx={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '40px'
                    }}>
                        <h3 className={s.signUp}>Sign Up</h3>
                        <ErrorMessage/>
                        <FormGroup>
                            <TextField
                                id="email"
                                type='email'
                                label="Email"
                                variant="standard"
                                margin='normal'
                                error={!!(formik.touched.email && formik.errors.email)}
                                helperText={formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                            <div className={s.wrapper}>
                                <TextField
                                    className={s.password}
                                    type={!isShowPass ? 'password' : 'text'}
                                    label="Password"
                                    variant="standard"
                                    margin='normal'
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={formik.errors.password}
                                    {...formik.getFieldProps('password')}
                                />
                                <VisibilityIcon className={s.eye}
                                                onClick={showPassHandler}/>
                            </div>
                            <div className={s.wrapper}>
                                <TextField
                                    className={s.password}
                                    type={!isShowConfirm ? 'password' : 'text'}
                                    label="Confirm password"
                                    variant="standard"
                                    margin='normal'
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={formik.errors.password}
                                    {...formik.getFieldProps('confirmPassword')}
                                />
                                <VisibilityIcon className={s.eye}
                                                onClick={showConfirmHandler}/>
                            </div>
                            <Button className={s.buttonSignUp}
                                    type={"submit"}
                                    variant="contained"
                                    style={{borderRadius: '50px', margin: '5px'}}>
                                Sign Up
                            </Button>
                            <h4 className={s.footerText}>Already have an account?</h4>
                            <NavLink to="/login"
                                     className={s.footerLink}>{isLogin ? "Return to profile" : "Sign In"}</NavLink>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};
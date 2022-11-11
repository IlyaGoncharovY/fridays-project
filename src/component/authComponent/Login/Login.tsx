import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField/TextField';
import {Box, Button, Checkbox, FormControlLabel, Paper} from "@mui/material";
import FormGroup from '@mui/material/FormGroup'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css'
import {Navigate, useNavigate} from 'react-router-dom';
import {loginTC} from "../../../bll/reducers/authReducer";
import {ErrorMessage} from "../../../common/SnackBar/Snackbar";
import {useAppDispatch, useAppSelector} from '../../../common/hook/hook';
import {PATH} from "../../../utils/path";
import VisibilityIcon from "@mui/icons-material/Visibility";


export const Login = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function showPassHandler() {
        setIsShowPass(!isShowPass)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            rememberMe: false,
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .required("Please Entry Email")
                .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address"),
            password: Yup
                .string()
                .required("Please Entry Password")
                .min(8, 'Should be more then 7 symbols')

        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
    const navigateToRegistration = () => {
        navigate(PATH.REGISTRATION)
    }
    const navigateToForgotPassword = () => {
        navigate(PATH.PASSWORD_RECOVERY)
    }

    return (
        (!!isLoggedIn) ? <Navigate to={PATH.PROFILE}/> : <Grid container justifyContent={'center'}>
            <Grid item justifyContent={"center"}>
                <Paper elevation={3}>
                    <Box className={s.box} component='form' onSubmit={formik.handleSubmit} sx={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '40px'
                    }}>
                        <h3 className={s.signIn}>Sign in</h3>
                        <ErrorMessage/>
                        <FormGroup>
                            <TextField
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }
                                label="Remember me"
                            />
                            <div className={s.forgotPassword}
                                 onClick={navigateToForgotPassword}>Forgot Password?
                            </div>
                            <Button variant="contained"
                                    style={{borderRadius: '50px'}}
                                    type='submit'>
                                Sign in
                            </Button>
                            <div className={s.account}>Already have an account?</div>
                            <div className={s.signUp}><span onClick={navigateToRegistration}>Sign Up</span>
                            </div>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

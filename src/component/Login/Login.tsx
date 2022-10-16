import React from 'react';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField/TextField';
import {Box, Button, Checkbox, FormControlLabel, Paper} from "@mui/material";
import FormGroup from '@mui/material/FormGroup'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import style from './login.module.css'
import {useNavigate} from 'react-router-dom';
import {loginTC} from "../../bll/reducers/loginReducer";
import {useDispatch} from "react-redux";


const Login = () => {
    // const isLogged = appUseSelector(state => state.auth.isLogged)
    // const captcha = appUseSelector(state => state.auth.captcha)
     const dispatch = useDispatch<any>()
    const navigate = useNavigate()
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
                .min(8, 'Should be more then 8 symbols')

        }),
        onSubmit: values => {

             dispatch(loginTC(values))
            alert(JSON.stringify(values))
            formik.resetForm()

        },
    });
    const onClickHandler = () => {
        navigate('/registration')
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={"center"}>
                <Paper elevation={3}>
                    <Box className={style.box} component='form' onSubmit={formik.handleSubmit} sx={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '40px'
                    }}>
                        <h3 className={style.signIn}>Sign in</h3>
                        <FormGroup>
                            <TextField
                                type='email'
                                label="Email"
                                variant="standard"
                                margin='normal'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color: "red"}}>{formik.errors.email}</div>
                            ) : null}
                            <TextField
                                type='password'
                                label="Password"
                                variant="standard"
                                margin='normal'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{color: "red"}}>{formik.errors.password}</div>
                            ) : null}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id='checkboxed'
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }
                                label="Remember me"

                            />
                            <div className={style.password}>Forgot Password?</div>
                            <Button variant="contained" style={{borderRadius: '50px'}} type='submit'>Sign in</Button>
                            <div className={style.account}>Already have an account?</div>
                            <div className={style.signUp}><span onClick={onClickHandler} className={style.signUp}>Sign Up</span>
                            </div>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
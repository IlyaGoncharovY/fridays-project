import React from 'react';
import {Button, Input} from '@mui/material';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {userDataType} from '../../api/regApi';
import {useAppDispatch, useAppSelector} from '../../bll/hook/hook';
import {regTC} from '../../bll/reducers/registration-Reducer';
import s from "./registration.module.scss";
import {ErrorMessage} from '../SnackBar/Snackbar';

type formikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const Registration = () => {

    const registered = useAppSelector(store => store.registration.registered)
    const isLogin = useAppSelector(store => store.login.isLoggedIn)
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
        <div className={s.rootReg}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.registrationContainer}>

                    <div className={s.label_top}>
                        Sign Up
                    </div>

                    <ErrorMessage/>

                    <div className={s.inputContainer}>
                        <Input
                            id={"email"}
                            type={"email"}
                            placeholder="Email"
                            sx={{p: 1}}
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && <div>{formik.errors.email}</div>}
                        <Input
                            id={"password"}
                            type={"password"}
                            placeholder="Password"
                            sx={{p: 1}}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && <div>{formik.errors.password}</div>}
                        <Input
                            id={"confirmPassword"}
                            type={"password"}
                            placeholder="Confirm password"
                            sx={{p: 1}}
                            {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.touched.confirmPassword && <div>{formik.errors.confirmPassword}</div>}
                    </div>
                    <div className={s.footerContainer}>
                        <Button type={"submit"} variant="contained" style={{borderRadius: '50px'}}>Sign Up</Button>
                        <h4 className={s.footerText}>Already have an account?</h4>
                        <NavLink to="/login"
                                 className={s.footerLink}>{isLogin ? "Return to profile" : "Sign In"}</NavLink>
                    </div>
                </div>
            </form>
        </div>


        //сюда положил контейнер с гридом
        // <Grid container justifyContent={'center'}>
        //     <Grid item justifyContent={"center"}>
        //         <Paper elevation={3}>
        //             <Box className={style.box} component='form' onSubmit={formik.handleSubmit} sx={{
        //                 backgroundColor: 'white',
        //                 width: '300px',
        //                 padding: '40px'
        //             }}>
        //                 <h3 className={style.signIn}>Sign Up</h3>
        //                 <ErrorMessage/>
        //                 <FormGroup>
        //                     <TextField
        //                         id={"email"}
        //                         type='email'
        //                         label="Email"
        //                         variant="standard"
        //                         margin='normal'
        //                         error={!!(formik.touched.email && formik.errors.email)}
        //                         helperText={formik.errors.email}
        //                         {...formik.getFieldProps('email')}
        //                     />
        //
        //                     <TextField
        //                         type='password'
        //                         label="Password"
        //                         variant="standard"
        //                         margin='normal'
        //                         error={!!(formik.touched.password && formik.errors.password)}
        //                         helperText={formik.errors.password}
        //                         {...formik.getFieldProps('password')}
        //                     />
        //                     <TextField
        //                         type='password'
        //                         label="Confirm password"
        //                         variant="standard"
        //                         margin='normal'
        //                         error={!!(formik.touched.password && formik.errors.password)}
        //                         helperText={formik.errors.password}
        //                         {...formik.getFieldProps('confirmPassword')}
        //                     />
        //                     <Button type={"submit"} variant="contained" style={{borderRadius: '50px'}}>Sign Up</Button>
        //                     <h4 className={s.footerText}>Already have an account?</h4>
        //                     <NavLink to="/login"
        //                              className={s.footerLink}>{isLogin ? "Return to profile" : "Sign In"}</NavLink>
        //                 </FormGroup>
        //             </Box>
        //         </Paper>
        //     </Grid>
        // </Grid>
    );
};
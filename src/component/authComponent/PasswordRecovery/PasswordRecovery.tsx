import React, {useState} from 'react';
import {Box, Button, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {recoveryTC} from "../../../bll/reducers/recoveryPasswordReducer";
import style from '../Login/Login.module.css'
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import {Navigate, useNavigate} from 'react-router-dom';
import {Input} from "../../../common/Input/Input";
import {PATH} from "../../../utils/path";

export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isCorrectEmail = useAppSelector(state => state.recovery.correctEmail)
    let [value, setValue] = useState('')
    let [error, setError] = useState<null | string>(null)
    const setEmail = (value: string) => {
        setValue(value)
    }
    const onClickHandler = () => {
        navigate(PATH.LOGIN)
    }
    const addEmail = () => {
        dispatch(recoveryTC(value))
    }
    if(isCorrectEmail){
        return <Navigate to={'/check-email'}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={"center"}>
                <Paper elevation={3}>
                    <Box className={style.box} component='div' sx={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '40px'
                    }}>
                        <FormGroup>
                            <h2 className={style.signIn}>Forgot your password?</h2>
                            <Input placeholder='Email' setItem={setEmail} value={value} type='text'/>
                            <p>Enter your email address and we will send you further instructions </p>
                            <Button onClick={addEmail} variant="contained" style={{borderRadius: '50px'}} type='submit'>Send
                                Instructions</Button>
                            <p className={style.account}>Did you remember your password?</p>
                            <p className={style.signUp} onClick={onClickHandler}><span>Try logging in</span></p>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};



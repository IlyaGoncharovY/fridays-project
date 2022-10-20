import React from 'react';
import Grid from "@mui/material/Grid";
import {Box, Button, Paper} from "@mui/material";
import style from "../Login/login.module.css";
import styleEmail from "./CheckEmail.module.css";
import FormGroup from "@mui/material/FormGroup";
import {useNavigate} from "react-router-dom";
import {correctEmail} from "../../bll/reducers/recoveryPasswordReducer";
import {useAppDispatch} from "../../bll/hook/hook";
import icon from '../common/assets/images/email-message-svgrepo-com.svg'
export const CheckEmail = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onClickHandler = () => {
        dispatch(correctEmail(false))
        navigate('/login')
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
                            <h2 className={style.signIn}>Check Email</h2>
                            <div className={styleEmail.circle}>
                                <img className={styleEmail.image} src={icon} alt="empty"/>
                            </div>
                            <p>We’ve sent an Email with instructions to example@mail.com</p>
                            <Button onClick={onClickHandler} variant="contained" style={{borderRadius: '50px'}}
                                    type='submit'>Back to login
                            </Button>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};


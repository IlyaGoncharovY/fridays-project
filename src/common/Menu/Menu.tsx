import React from 'react';
import {useNavigate} from "react-router-dom";
import s from "./menu.module.scss"
import {useAppDispatch, useAppSelector} from "../hook/hook";
import {Avatar, Button} from "@mui/material";
import {PATH} from "../../utils/path";
import {initializingTC} from "../../bll/reducers/appReducer";

export const Menu = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const login = () => {
        navigate(PATH.LOGIN)
    }
    const enterProfile = () => {
        navigate(PATH.PROFILE)
        dispatch(initializingTC())
    }
    return (
        <div className={s.menu}>
            <div className={s.logoContainer}>
                <div className={s.logo}></div>
            </div>
            <div className={s.login}>
                {
                    isLoggedIn
                        ? <div className={s.profileHeader}
                               onClick={enterProfile}
                        >
                            <div className={s.name}>{profile.name}</div>
                            <Avatar alt={profile.name}
                                    src={profile.avatar}
                                    sx={{width: 40, height: 40}}/>
                        </div>
                        :
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={s.buttonLogout}
                                onClick={login}
                        >Sign in</Button>
                }
            </div>
        </div>
    );
};


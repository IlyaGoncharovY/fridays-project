import React from 'react';
import {useNavigate} from "react-router-dom";
import s from "./menu.module.scss"
import {useAppSelector} from "../hook/hook";
import {Avatar, Button} from "@mui/material";
import avatar from "../assets/images/photoProfile.png"
import {PATH} from "../../utils/path";

export const Menu = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
    const navigate = useNavigate()
    const login = () => {
        navigate(PATH.LOGIN)
    }
    const enterProfile = () => {
        navigate(PATH.PROFILE)
    }
    return (
        <div className={s.menu}>
            <div className={s.logoContainer}>
                <div className={s.logo}></div>
            </div>
            <div className={s.login}>
                {
                    isLoggedIn ?
                        <div className={s.profileHeader}
                             onClick={enterProfile}
                        >
                            <div>{profile.name}
                                <hr/>
                            </div>
                            <Avatar alt={profile.name}
                                    src={avatar}
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


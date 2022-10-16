import React from 'react';
import s from "./profile.module.scss"
import {useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const isLogin = useAppSelector(state => state.login.isLoggedIn)

    if(!isLogin){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profileContainer}>
            Profile
        </div>
    );
};


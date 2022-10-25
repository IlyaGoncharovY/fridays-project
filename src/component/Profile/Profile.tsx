import React from 'react';
import s from "./profile.module.scss"
import {useAppDispatch, useAppSelector} from '../../bll/hook/hook';
import photoProfile from '../common/assets/images/photoProfile.png'
import {Button} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {updateProfileTC} from "../../bll/reducers/profileReducer";
import {Navigate, NavLink} from "react-router-dom";
import {logoutTC} from '../../bll/reducers/loginReducer';

export const Profile = () => {

    const isLogin = useAppSelector(state => state.login.isLoggedIn)

    const profileName = useAppSelector(state => state.profile.name)
    const dispatch = useAppDispatch()

    const logoUtHandler = () => {
        dispatch(logoutTC())
    }

    const onChangeNameHandler = (name: string) => {
        dispatch(updateProfileTC(name))
    }
    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profile}>
            <div className={s.profileContainer}>
                <h3 className={s.title}>Personal information</h3>
                <NavLink to={"/pack-list"}>Go to PackList</NavLink>
                <div className={s.img}><img className={s.img} src={photoProfile}/></div>
                <div className={s.name}><EditableSpan name={profileName} onChangeName={onChangeNameHandler}/></div>
                <div className={s.email}>email</div>
                <div className={s.button}><Button variant="contained" onClick={logoUtHandler}>Log out</Button></div>
            </div>
        </div>
    )
}


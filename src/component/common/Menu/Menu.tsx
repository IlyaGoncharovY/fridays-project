import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./menu.module.scss"
import {useAppDispatch, useAppSelector} from "../../../bll/hook/hook";
import {logoutTC} from "../../../bll/reducers/loginReducer";

export const Menu = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const logout = () => {
        if (isLoggedIn) {
            dispatch(logoutTC())
        }
    }
    return (
        <div className={s.Menu}>
            <NavLink to={"/registration"}>registration</NavLink>
            <NavLink to={"/profile"}>profile</NavLink>
            <NavLink to={"/password_recovery"}>password_recovery</NavLink>
            <NavLink to={"/entering_new_password"}>entering_new_password</NavLink>
            <NavLink to={"/test_component"}>test_component</NavLink>
            <NavLink to={"/component404"}>404</NavLink>
            <NavLink to={"/login"}>{!!isLoggedIn ? <span onClick={logout}>logout</span> : 'login'}</NavLink>
            <NavLink to={"/"}/>
        </div>
    );
};


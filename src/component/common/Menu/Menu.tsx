import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./menu.module.scss"

export const Menu = () => {

    return (
        <div className={s.Menu}>
            <NavLink to={"/registration"}>registration</NavLink>
            <NavLink to={"/profile"}>profile</NavLink>
            <NavLink to={"/password_recovery"}>password_recovery</NavLink>
            <NavLink to={"/entering_new_password"}>entering_new_password</NavLink>
            <NavLink to={"/test_component"}>test_component</NavLink>
            <NavLink to={"/component404"}>404</NavLink>
            <NavLink to={"/login"}>login</NavLink>
            <NavLink to={"/"}/>
        </div>
    );
};


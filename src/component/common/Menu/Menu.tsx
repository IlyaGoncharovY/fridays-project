import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./Menu.module.css"

export const PATH = {
    ORGANIZATION: "/organization",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    PASSWORD_RECOVERY: "/password_recovery",
    ENTERING_PASSWORD: "/entering_new_password",
    TEST_COMPONENT: "/test_component",
    MAIN: "/"
}

export const Menu = () => {
    return (
        <div className={s.Menu}>
            <NavLink to={"/organization"}>organization</NavLink>
            <NavLink to={"/registration"}>registration</NavLink>
            <NavLink to={"/profile"}>profile</NavLink>
            <NavLink to={"/password_recovery"}>password_recovery</NavLink>
            <NavLink to={"/entering_new_password"}>entering_new_password</NavLink>
            <NavLink to={"/test_component"}>test_component</NavLink>
            <NavLink to={"/"}/>
        </div>
    );
};


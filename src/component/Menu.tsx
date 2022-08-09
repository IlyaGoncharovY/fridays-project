import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Organization} from "./Organization";
import {Registration} from "./Registration";
import {Profile} from "./Profile";
import {PasswordRecovery} from "./Password-recovery";
import {EnteringNewPassword} from "./Entering-new-password";
import {TestComponent} from "./TestComponent";

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
        <div>
            <Routes>
                <Route path={PATH.ORGANIZATION} element={<Organization/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.ENTERING_PASSWORD} element={<EnteringNewPassword/>}/>
                <Route path={PATH.TEST_COMPONENT} element={<TestComponent/>}/>
                <Route path={PATH.MAIN} element={<TestComponent/>}/>
            </Routes>
        </div>
    );
};


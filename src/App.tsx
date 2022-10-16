import React from 'react';
import './App.scss';
import {Menu} from "./component/common/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import {Organization} from "./component/organization/Organization";
import {Registration} from "./component/Registration/Registration";
import {Profile} from "./component/Profile/Profile";
import {PasswordRecovery} from "./component/passwordRecovery/Password-recovery";
import {EnteringNewPassword} from "./component/enteringNewPassword/Entering-new-password";
import {TestComponent} from "./component/testComponent/TestComponent";
import {Component404} from "./component/component404/Component404";
import Login from "./component/Login/Login";

export const PATH = {
    ORGANIZATION: "/organization",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    PASSWORD_RECOVERY: "/password_recovery",
    ENTERING_PASSWORD: "/entering_new_password",
    TEST_COMPONENT: "/test_component",
    ERROR: "/component404",
    MAIN: "/",
    LOGIN : "/login"
}

function App() {
    return (
        <div className="App">
            <div>
                <Menu/>
                <Routes>
                    <Route path={PATH.ORGANIZATION} element={<Organization/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                    <Route path={PATH.ENTERING_PASSWORD} element={<EnteringNewPassword/>}/>
                    <Route path={PATH.TEST_COMPONENT} element={<TestComponent/>}/>
                    <Route path={PATH.ERROR} element={<Component404/>}/>
                    <Route path={PATH.MAIN} element={<TestComponent/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

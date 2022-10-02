import React from 'react';
import './App.css';
import {Menu} from "./component/common/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import {Organization} from "./component/Organization";
import {Registration} from "./component/Registration";
import {Profile} from "./component/Profile";
import {PasswordRecovery} from "./component/Password-recovery";
import {EnteringNewPassword} from "./component/Entering-new-password";
import {TestComponent} from "./component/TestComponent";
import {Component404} from "./component/Component404";

export const PATH = {
    ORGANIZATION: "/organization",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    PASSWORD_RECOVERY: "/password_recovery",
    ENTERING_PASSWORD: "/entering_new_password",
    TEST_COMPONENT: "/test_component",
    ERROR: "/component404",
    MAIN: "/"
}

function App() {
    return (
        <div className="App">
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
            </Routes>
        </div>
    );
}

export default App;

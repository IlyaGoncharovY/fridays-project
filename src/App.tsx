import React, {useEffect} from 'react';
import './App.scss';
import {Menu} from "./component/common/Menu/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import {Registration} from "./component/Registration/Registration";
import {Profile} from "./component/Profile/Profile";
import {PasswordRecovery} from "./component/passwordRecovery/Password-recovery";
import {EnteringNewPassword} from "./component/enteringNewPassword/Entering-new-password";
import {TestComponent} from "./component/testComponent/TestComponent";
import {Component404} from "./component/component404/Component404";
import {Login} from "./component/Login/Login";
import {useAppDispatch, useAppSelector} from "./bll/hook/hook";
import {initializingTC} from "./bll/reducers/authReducer";
import {Loader} from "./component/Loader/Loader";
import {CheckEmail} from "./component/CheckEmail/CheckEmail";

export const PATH = {
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    PASSWORD_RECOVERY: "/password_recovery",
    ENTERING_PASSWORD: "/entering_new_password",
    TEST_COMPONENT: "/test_component",
    ERROR: "/component404",
    MAIN: "/",
    LOGIN: "/login",
    NEW_PASSWORD: 'set-new-password/*',
    CHECK_EMAIL: 'check-email'
}


function App() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(initializingTC())
    }, [])
    return (
        <div className="App">
            <div>
                <Menu/>
                {!isAuth && <Loader/>}
                <Routes>
                    <Route path={PATH.NEW_PASSWORD} element={<EnteringNewPassword/>}/>
                    <Route path={PATH.MAIN} element={<Navigate to={PATH.PROFILE}/>}/>
                    <Route path={"fridays-project"} element={<Navigate to={PATH.PROFILE}/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                    <Route path={PATH.ENTERING_PASSWORD} element={<EnteringNewPassword/>}/>
                    <Route path={PATH.TEST_COMPONENT} element={<TestComponent/>}/>
                    <Route path={PATH.ERROR} element={<Component404/>}/>
                    <Route path={PATH.MAIN} element={<TestComponent/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                    <Route path={'*'} element={<Navigate to={PATH.ERROR}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

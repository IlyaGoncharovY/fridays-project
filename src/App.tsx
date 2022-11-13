import React, {useEffect} from 'react';
import './App.scss';
import {Menu} from "./common/Menu/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import {Registration} from "./component/authComponent/Registration/Registration";
import {Profile} from "./component/authComponent/Profile/Profile";
import {PasswordRecovery} from "./component/authComponent/PasswordRecovery/PasswordRecovery";
import {EnteringNewPassword} from "./component/authComponent/EnteringNewPassword/EnteringNewPassword";
import {Login} from "./component/authComponent/Login/Login";
import {CheckEmail} from "./component/CheckEmail/CheckEmail";
import {PackList} from './component/Pack-card_component/Pack/PackList/PackList';
import {CardList} from './component/Pack-card_component/Card/CardList/CardList';
import {Learn} from "./component/Learn/Learn";
import {PATH} from "./utils/path";
import {NotFound} from "./component/NotFound/NotFound";
import {useAppDispatch, useAppSelector} from "./common/hook/hook";
import {initializingTC} from "./bll/reducers/appReducer";
import {Loader} from "./common/Loader/Loader";

function App() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializingTC())
    }, [])

    return (
        <>
            {!isAuth
                ? <Loader/>
                : <div className="App">
                    <div>
                        <Menu/>
                        <Routes>
                            <Route path={PATH.MAIN} element={<Navigate to={PATH.PROFILE}/>}/>
                            <Route path={PATH.PROFILE} element={<Profile/>}/>
                            <Route path={PATH.LOGIN} element={<Login/>}/>
                            <Route path={PATH.PACK} element={<PackList/>}/>
                            <Route path={`${PATH.CARD}/:cardsPack_id/:userID/:packName`} element={<CardList/>}/>
                            <Route path={`${PATH.LEARN}/:cardsPack_id/:userID/:packName`} element={<Learn/>}/>
                            <Route path={PATH.NEW_PASSWORD} element={<EnteringNewPassword/>}/>
                            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                            <Route path={'*'} element={<Navigate to={PATH.ERROR}/>}/>
                            <Route path={PATH.ERROR} element={<NotFound/>}/>
                            <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                            <Route path={PATH.ENTERING_PASSWORD} element={<EnteringNewPassword/>}/>
                            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                        </Routes>
                    </div>
                </div>}
        </>
    )
}

export default App;

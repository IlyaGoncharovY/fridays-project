import React, {useEffect} from 'react';
import s from "./Profile.module.scss"
import {useAppDispatch, useAppSelector} from '../../../common/hook/hook';
import photoProfile from '../../../common/assets/images/photoProfile.png'
import {Button} from "@mui/material";
import EditableSpan from "./EditableSpan/EditableSpan";
import {updateProfileTC} from "../../../bll/reducers/profileReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../bll/reducers/authReducer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PATH} from "../../../utils/path";
import {initializingTC} from "../../../bll/reducers/appReducer";
import {Loader} from "../../../common/Loader/Loader";


export const Profile = () => {

    const isLogin = useAppSelector(state => state.login.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoUtHandler = () => {
        dispatch(logoutTC())

    }
    const backToPacksList = () => {
        navigate(PATH.PACK)
    }
    const onChangeNameHandler = (name: string) => {
        dispatch(updateProfileTC(name))
    }

    useEffect(() => {
        dispatch(initializingTC())
    }, [])


    if (!isAuth) return <Loader/>
    return (
        <>
            { !isLogin
                ? <Navigate to={PATH.LOGIN}/>
                : <div>
                    <div className={s.backToPacksList} onClick={backToPacksList}><ArrowCircleLeftIcon/> Back to Packs List</div>
                    <div className={s.profile}>
                        <div className={s.profileContainer}>
                            <h3 className={s.title}>PERSONAL INFORMATION</h3>
                            <div className={s.img}><img className={s.img} src={photoProfile}/></div>
                            <div className={s.name}><b>NAME: </b><EditableSpan name={profile.name}
                                                                               onChangeName={onChangeNameHandler}/></div>
                            <div className={s.email}><b>EMAIL: </b>{profile.email}</div>
                            <div className={s.email}><b>TOTAL COUNT OF CREATED PACKS: </b>{profile.publicCardPacksCount}</div>
                            <div className={s.button}><Button variant="contained" onClick={logoUtHandler}>Log out</Button></div>
                        </div>
                    </div>
                </div>
            }
        </>

)
}


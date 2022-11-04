import React from 'react';
import s from "./Profile.module.scss"
import {useAppDispatch, useAppSelector} from '../../../common/hook/hook';
import photoProfile from '../../../common/assets/images/photoProfile.png'
import {Button} from "@mui/material";
import EditableSpan from "./EditableSpan/EditableSpan";
import {updateProfileTC} from "../../../bll/reducers/profileReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../bll/reducers/loginReducer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PATH} from "../../../utils/path";


export const Profile = () => {

    const isLogin = useAppSelector(state => state.login.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
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
    if(!isLogin){
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div className={s.backToPacksList} onClick={backToPacksList}> <ArrowCircleLeftIcon/> Back to Packs List</div>
            <div className={s.profile}>
                <div className={s.profileContainer}>
                    <h3 className={s.title}>Personal information</h3>
                    <div className={s.img}><img className={s.img} src={photoProfile}/></div>
                    <div className={s.name}><EditableSpan name={profile.name} onChangeName={onChangeNameHandler}/></div>
                    <div className={s.email}>{profile.email}</div>
                    <div className={s.button}><Button variant="contained" onClick={logoUtHandler}>Log out</Button></div>
                </div>
            </div>
        </div>
    )
}


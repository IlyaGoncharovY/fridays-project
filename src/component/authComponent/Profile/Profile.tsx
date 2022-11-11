import React, {ChangeEvent, useEffect} from 'react';
import s from "./Profile.module.scss"
import {useAppDispatch, useAppSelector} from '../../../common/hook/hook';
import {AppBar, Button, IconButton, LinearProgress} from "@mui/material";
import EditableSpan from "./EditableSpan/EditableSpan";
import {updateProfileTC} from "../../../bll/reducers/profileReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../bll/reducers/authReducer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {PATH} from "../../../utils/path";
import {initializingTC} from "../../../bll/reducers/appReducer";
import {Loader} from "../../../common/Loader/Loader";
import {PhotoCamera} from "@mui/icons-material";
import {convertFileToBase64} from "../../../utils/convertFileToBase64-utilit";


export const Profile = () => {

    const isLogin = useAppSelector(state => state.login.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
    const {isAuth, status} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoUtHandler = () => {
        dispatch(logoutTC())

    }
    const backToPacksList = () => {
        navigate(PATH.PACK)
    }
    const onChangeNameHandler = (name: string) => {
        dispatch(updateProfileTC({name}))
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateProfileTC({avatar: file64}))
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    useEffect(() => {
        dispatch(initializingTC())
    }, [])

    if (!isAuth) return <Loader/>

    return (
        <>
            {!isLogin
                ? <Navigate to={PATH.LOGIN}/>
                : status === 'loading'
                    ? <AppBar><LinearProgress/></AppBar>
                    : <div>
                    <div className={s.backToPacksList} onClick={backToPacksList}><ArrowCircleLeftIcon/> Back to Packs
                        List
                    </div>
                    <div className={s.profile}>
                        <div className={s.profileContainer}>
                            <h3 className={s.title}>PERSONAL INFORMATION</h3>
                            <div><img className={s.img} src={profile.avatar}/>
                                <IconButton className={s.uploadImg} color="primary" aria-label="upload picture"
                                            component="label">
                                    <input hidden accept="image/*"
                                           type="file"
                                           onChange={uploadHandler}/>
                                    <PhotoCamera/>
                                </IconButton>
                            </div>
                            <div className={s.name}><b>NAME: </b><EditableSpan name={profile.name}
                                                                               onChangeName={onChangeNameHandler}/>
                            </div>
                            <div className={s.email}><b>EMAIL: </b>{profile.email}</div>
                            <div className={s.email}><b>TOTAL COUNT OF CREATED PACKS: </b>{profile.publicCardPacksCount}
                            </div>
                            <div className={s.button}><Button variant="contained" onClick={logoUtHandler}>Log
                                out</Button></div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}


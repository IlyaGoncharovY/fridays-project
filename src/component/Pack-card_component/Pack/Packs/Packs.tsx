import {TextField} from "@mui/material"
import s from "./pasks.module.scss"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {deleteListTC, editListTC} from "../../../../bll/reducers/listsReducer";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {PATH} from "../../../../App";

type PacksType = {
    packID: string
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
}

export const Packs = (props: PacksType) => {
    const isLogin = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState("")

    const editHandler = () => {
        setIsEdit(true)
        setTitle(props.name)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTitleHandler = () => {
        if (title.trim().length === 0 || title.length > 20) {
            return alert('Please enter correct field: Name')
        }
        else {
            dispatch(editListTC(props.packID, title))
            setIsEdit(false)
        }
    }
    const onKeyboardAddTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim().length === 0 || title.length > 20) {
            return alert('Please enter correct field: Name')
        }
        else if (event.key === "Enter") {
            dispatch(editListTC(props.packID, title))
            setIsEdit(false)
        }
    }

    const deleteHandler = () => {
        dispatch(deleteListTC(props.packID))
    }
    const navigateToCard = () => {
        navigate(PATH.CARD)
    }
    if(!isLogin){
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.packsContainer}>

            <div className={s.packBody}>
                <div className={s.title}>
                    {isEdit
                        ? <TextField
                            value={title}
                            variant={"standard"}
                            onChange={onChangeHandler}
                            onBlur={addTitleHandler}
                            onKeyDown={onKeyboardAddTitle}
                            autoFocus
                        />
                        : <div onClick={navigateToCard}>{props.name}</div>
                    }
                </div>
                    <div>{props.cards}</div>
                    <div>{props.lastUpdated}</div>
                <div>{props.userName}</div>
                <div className={s.icon}>
                    <AddCircleOutlineIcon/>
                    <EditIcon onClick={editHandler}/>
                    <DeleteIcon onClick={deleteHandler}/>
                </div>

            </div>
        </div>

    )
}
import {AppBar, LinearProgress, TextField} from "@mui/material"
import s from "./Pack.module.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../common/hook/hook";
import React, {ChangeEvent, useEffect, useState} from "react";
import {setCardsPackID} from "../../../../../../bll/reducers/cardsReducer";
import SchoolIcon from "@mui/icons-material/School";
import {PacksModal} from "../../../../../../common/ModalWindow/PackModalWindow/PacksModal";
import {DeleteModal} from "../../../../../../common/ModalWindow/DeleteModal/DeleteModal";
import {deletePackTC, editPackTC} from "../../../../../../bll/reducers/packsReducer";
import {PATH} from "../../../../../../utils/path";

type PackType = {
    packID: string
    userID: string
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
}

export const Pack = (props: PackType) => {
    const userID = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [title, setTitle] = useState(props.name)


    useEffect(() => {
        dispatch(setCardsPackID(props.packID))
    }, [])

    const openEdit = () => setIsEdit(true)
    const closeEdit = () => setIsEdit(false)

    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const changeNamePack = () => {
        dispatch(editPackTC(props.packID, title))
    }

    const schoolHandler = () => {
        navigate(`${PATH.LEARN}/${props.packID}/${props.userID}/${props.name}`)
    }
    const deleteHandler = () => {
        dispatch(deletePackTC(props.packID))
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const navigateToCard = () => {
        navigate(`${PATH.CARD}/${props.packID}/${props.userID}/${props.name}`)
        dispatch(setCardsPackID(props.packID))
    }

    return (
        <>
            {status === 'loading'
                ? <AppBar><LinearProgress/></AppBar>
                : <tr>
                    <th className={s.title}>
                        {isEdit
                            ? <TextField
                                value={title}
                                variant={"standard"}
                                onChange={onChangeHandler}
                                autoFocus
                            />
                            : <div onClick={navigateToCard}>{props.name}</div>
                        }
                    </th>
                    <th>{props.cards}</th>
                    <th>{props.lastUpdated}</th>
                    <th>{props.userName}</th>
                    <th className={s.icon}>
                        <SchoolIcon onClick={schoolHandler} className={s.schoolIcon}/>
                        {
                            userID === props.userID &&
                            <EditIcon onClick={openEdit} className={s.editIcon}/>
                        }
                        {
                            userID === props.userID &&
                            <DeleteIcon onClick={openDelete}
                                        className={s.deleteIcon}/>
                        }
                    </th>
                </tr>}
            <PacksModal
                nameModal={"EDIT PACK"}
                open={isEdit}
                closeHandler={closeEdit}
                thunkCallBack={changeNamePack}
                onChange={onChangeTitleHandler}
                packID={props.packID}
                title={title}
            />
            <DeleteModal
                nameModal={"DELETE PACK"}
                open={isDelete}
                closeHandler={closeDelete}
                thunkCallBack={deleteHandler}
                packID={props.packID}
                name={props.name}
            />
        </>
    )
}

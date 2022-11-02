import {AppBar, LinearProgress, TextField} from "@mui/material"
import s from "./Card.module.scss"
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteCardTC, editCardTC} from "../../../../../../bll/reducers/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../../../bll/hook/hook";
import React, {ChangeEvent, useState} from "react";
import {HalfRating} from "../../../../../common/Rating/Rating";
import {DeleteModal} from "../../../../../common/modalWindow/deleteModal/DeleteModal";
import {CardModal} from "../../../../../common/modalWindow/cardModalWindow/CardModal";

type CardType = {
    cardID: string
    userID: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

export const Card = (props: CardType) => {

    const userID = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [question, setQuestion] = useState(props.question)
    const [answer, setAnswer] = useState(props.answer)


    const openEdit = () => setIsEdit(true)
    const closeEdit = () => setIsEdit(false)
    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }
    const addTitleHandler = () => {
            dispatch(editCardTC(props.cardID, question, answer))
    }
    const deleteHandler = () => {
        dispatch(deleteCardTC(props.cardID))
    }
    return (
        <>
            {status === 'loading'
                ? <AppBar><LinearProgress/></AppBar>
                : <tr>
                    <th style={{padding: "22px"}}>
                        {isEdit
                            ? <TextField
                                value={question}
                                variant={"standard"}
                                onChange={onChangeQuestionHandler}
                                autoFocus
                            />
                            : <div>{props.question}</div>
                        }</th>
                    <th>
                        {isEdit
                            ? <TextField
                                value={answer}
                                variant={"standard"}
                                onChange={onChangeAnswerHandler}
                                autoFocus
                            />
                            : <div>{props.answer}</div>
                        }</th>
                    <th>{props.lastUpdated}</th>
                    <th><HalfRating grade={props.grade}/></th>
                    <th className={s.icons}>
                        <SchoolIcon className={s.schoolIcon}/>
                        {userID === props.userID && <EditIcon onClick={openEdit} className={s.editIcon}/>}
                        {userID === props.userID && <DeleteIcon onClick={openDelete} className={s.deleteIcon}/>}
                    </th>
                </tr>}
            <CardModal
                nameInput={"edit card"}
                open={isEdit}
                closeHandler={closeEdit}
                thunkCallBack={addTitleHandler}
                onChangeQuestion={onChangeQuestionHandler}
                onChangeAnswer={onChangeAnswerHandler}
                question={question}
                answer={answer}

            />
            <DeleteModal
                nameModal={"delete card"}
                open={isDelete}
                closeHandler={closeDelete}
                thunkCallBack={deleteHandler}
                question={props.question}
            />
        </>
    )
}
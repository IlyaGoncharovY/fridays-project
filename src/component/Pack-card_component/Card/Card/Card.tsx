import {TextField} from "@mui/material"
import s from "./card.module.scss"
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteCardTC, editCardTC} from "../../../../bll/reducers/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PacksType = {
    cardID: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
    userID: string
}

export const Card = (props: PacksType) => {
    const userID = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const editHandler = () => {
        setIsEdit(true)
        setQuestion(props.question)
        setAnswer(props.answer)
    }
    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }
    const addTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && event.ctrlKey) {
            dispatch(editCardTC(props.cardID, question, answer))
            setIsEdit(false)
        }

    }

    const deleteHandler = () => {
        dispatch(deleteCardTC(props.cardID))
    }

    return (
        <tr>
            <th style={{padding: "22px"}}>
                {isEdit
                    ? <TextField
                        value={question}
                        variant={"standard"}
                        onChange={onChangeQuestionHandler}
                        onKeyDown={addTitleHandler}
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
                        onKeyDown={addTitleHandler}
                        autoFocus
                    />
                    : <div>{props.answer}</div>
                }</th>
            <th>{props.lastUpdated}</th>
            <th>{props.grade}</th>
            <th className={s.icons}>
                <SchoolIcon/>
                {userID === props.userID && <EditIcon onClick={editHandler}/>}
                {userID === props.userID && <DeleteIcon onClick={deleteHandler}/>}
            </th>
        </tr>
    )
}
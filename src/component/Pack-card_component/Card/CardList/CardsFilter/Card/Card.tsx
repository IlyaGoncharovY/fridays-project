import {AppBar, LinearProgress} from "@mui/material"
import s from "./Card.module.scss"
import {deleteCardTC, editCardTC} from "../../../../../../bll/reducers/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../../../common/hook/hook";
import React, {ChangeEvent, useState} from "react";
import {HalfRating} from "../../../../../../common/Rating/Rating";
import {DeleteModal} from "../../../../../../common/ModalWindow/DeleteModal/DeleteModal";
import {CardModal} from "../../../../../../common/ModalWindow/cardModalWindow/CardModal";
import {EditAndDeleteIcon} from "../../../../../../common/EditAndDeleteIcon/EditAndDeleteIcon";
import {convertFileToBase64} from "../../../../../../utils/convertFileToBase64";
import {SelectChangeEvent} from "@mui/material/Select";

type CardType = {
    cardID: string
    userID: string
    question: string
    questionImg: string
    answer: string
    lastUpdated: string
    grade: number
}
type InputFieldModType = "text" | "picture"

export const Card = (props: CardType) => {

    const userID = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.auth.status)

    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [question, setQuestion] = useState(props.question)
    const [answer, setAnswer] = useState(props.answer)
    const [modeQuestion, setModQuestion] = useState<InputFieldModType>("text")
    const [questionImg, setQuestionImg] = useState(props.questionImg)

    const openEdit = () => setIsEdit(true)
    const closeEdit = () => setIsEdit(false)
    const openDelete = () => setIsDelete(true)
    const closeDelete = () => setIsDelete(false)

    const modeHandleChange = (e: SelectChangeEvent) => {
        setModQuestion(e.target.value as InputFieldModType)
    }

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }

    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }

    const addTitleHandler = () => {
            dispatch(editCardTC(props.cardID, question, answer, questionImg!))
    }

    const deleteHandler = () => {
        dispatch(deleteCardTC(props.cardID))
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) {
            const file = e.currentTarget.files[0]
            // console.log('file: ', file)
            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    setQuestionImg(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    };

    return (
        <>
            {status === 'loading'
                ? <AppBar><LinearProgress/></AppBar>
                : <tr>
                    <th style={{padding: "22px"}}>
                        <div>
                            {questionImg ?
                            <img style={{width:'50px', height: '50px'}} src={questionImg} alt="question"/> :
                            question}
                        </div>
                    </th>
                    <th>
                        <div>{props.answer}</div>
                    </th>
                    <th>{props.lastUpdated}</th>
                    <th><HalfRating grade={props.grade}/></th>
                    <th className={s.icons}>
                        {userID === props.userID &&
                        <EditAndDeleteIcon openEdit={openEdit} openDelete={openDelete}/>}
                    </th>
                </tr>}
            <CardModal
                nameInput={"edit card"}
                open={isEdit}
                closeHandler={closeEdit}
                thunkCallBack={addTitleHandler}
                onChangeQuestion={onChangeQuestionHandler}
                onChangeAnswer={onChangeAnswerHandler}
                uploadHandler={uploadHandler}
                question={question}
                answer={answer}
                modeQuestion={modeQuestion}
                modeHandleChange={modeHandleChange}
                questionImg={questionImg}
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
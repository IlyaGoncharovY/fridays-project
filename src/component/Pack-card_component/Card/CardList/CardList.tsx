import {NavLink, useNavigate, useParams} from "react-router-dom"
import {CardModal} from "../../../../common/ModalWindow/cardModalWindow/CardModal"
import {CardFilter} from "./CardsFilter/CardFilter"
import s from "./Card-list.module.scss"
import {PaginationButton} from "../../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../common/hook/hook";
import React, {ChangeEvent, useEffect, useState} from "react";
import {addCardTC, fetchCardsTC, setCards} from "../../../../bll/reducers/cardsReducer";
import Button from "@mui/material/Button/Button";
import {PATH} from "../../../../utils/path";
import {CardSettingsForPacks} from "./OptionCard/CardSettingsForPacks";
import {convertFileToBase64} from "../../../../utils/convertFileToBase64";
import defaultAva from "../../../../common/assets/images/defaultAva.png";
import {SelectChangeEvent} from "@mui/material/Select";

type InputFieldModType = "text" | "picture"

export const CardList = () => {

    const params = useParams()

    const {cardsPack_id, userID, packName} = params

    const cards = useAppSelector(state => state.cards.cards)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const cardAnswer = useAppSelector(state => state.cards.cardAnswer)
    const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
    const id = useAppSelector(state => state.profile._id)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [ava, setAva] = useState(defaultAva)
    const [modeQuestion, setModQuestion] = useState<InputFieldModType>("text")

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(fetchCardsTC({cardsPack_id, pageCount}))
        }
    }, [])



    const setPages = (page: number) => {
        // console.log(cardsPack_id)
        if (cardsPack_id) {
            dispatch(fetchCardsTC({cardsPack_id, page, pageCount, cardAnswer, cardQuestion}))
        }
    }

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const addCardHandler = () => {
        if (question.trim() || answer.trim()) {
            dispatch(addCardTC(question.trim(), answer.trim(), ava))
        }
        setQuestion("")
    }

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }

    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }

    const modeHandleChange = (e: SelectChangeEvent) => {
        setModQuestion(e.target.value as InputFieldModType)
    }

    const navigateToLearn = () => {
        dispatch(setCards([]))
        navigate(`${PATH.LEARN}/${cardsPack_id}/${userID}/${packName}`)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            // console.log('file: ', file)
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAva(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    };

    return (
        <div className={s.CardListContainer}>
            <NavLink to={PATH.PACK}>return to PackList</NavLink>
            <div className={s.CardListHeader}>
                {id === userID
                    ? <div className={s.CardListHeaderTitle}>
                        {packName}
                        <CardSettingsForPacks packID={cardsPack_id!} userID={userID} name={packName}/>
                    </div>
                    : <div className={s.CardListHeaderTitle}>
                        Friend's Pack
                    </div>}

                <div className={s.CardListHeaderButton}>
                    {id === userID
                        ? <Button onClick={openHandler} variant="contained">{"Add new card"}</Button>
                        : <Button onClick={navigateToLearn} disabled={!cards.length}
                                  variant="contained">{"Learn to pack"}</Button>
                    }
                    <CardModal
                        open={open}
                        closeHandler={closeHandler}
                        thunkCallBack={addCardHandler}
                        onChangeQuestion={onChangeQuestionHandler}
                        onChangeAnswer={onChangeAnswerHandler}
                        uploadHandler={uploadHandler}
                        modeQuestion={modeQuestion}
                        modeHandleChange={modeHandleChange}
                        nameModal={"Add new card"}
                    />
                </div>
            </div>
            <CardFilter/>
            <PaginationButton pageCount={pageCount} totalCount={totalCount} setPages={setPages}/>
        </div>

    )
}
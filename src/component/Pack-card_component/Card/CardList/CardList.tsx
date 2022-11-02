import {NavLink, useParams} from "react-router-dom"
import {CardModal} from "../../../common/modalWindow/cardModalWindow/CardModal"
import {CardFilter} from "./CardsFilter/CardFilter"
import s from "./Card-list.module.scss"
import {PaginationButtons} from "../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {changeCardsPages} from "../../../../bll/reducers/pageCardsReducer";
import {ChangeEvent, useEffect, useState} from "react";
import {addCardTC, fetchCardsTC} from "../../../../bll/reducers/cardsReducer";
import Button from "@mui/material/Button/Button";


export const CardList = () => {
    const params = useParams()

    const id = params.cardID
    const page = useAppSelector(state => state.cardsPages.countPerPage)
    const totalCount = useAppSelector(state => state.cardsPages.cardsTotalCount)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        if (id) {
            dispatch(fetchCardsTC(id))
        }
    }, [])

    const setPages = (value: number) => {
        dispatch(changeCardsPages(value))
    }

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const addCardHandler = () => {
        if (question.trim()) {
            dispatch(addCardTC(question.trim()))
        }
        setQuestion("")
    }

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }

    return (
        <div className={s.CardListContainer}>
            <NavLink to={"/pack-list"}>return to PackList</NavLink>
            <div className={s.CardListHeader}>
                <div className={s.CardListHeaderTitle}>
                    Card list
                </div>
                <div className={s.CardListHeaderButton}>
                    <Button onClick={openHandler} variant="contained">{"Add new card"}</Button>
                    <CardModal
                        open={open}
                        closeHandler={closeHandler}
                        thunkCallBack={addCardHandler}
                        onChangeQuestion={onChangeQuestionHandler}
                        onChangeAnswer={onChangeAnswerHandler}
                        nameModal={"Add new card"}
                    />
                </div>
            </div>
            <CardFilter/>
            <PaginationButtons page={page} totalCount={totalCount} setPages={setPages}/>
        </div>

    )
}
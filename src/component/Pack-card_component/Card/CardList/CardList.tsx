import {NavLink, useNavigate, useParams} from "react-router-dom"
import {CardModal} from "../../../../common/ModalWindow/cardModalWindow/CardModal"
import {CardFilter} from "./CardsFilter/CardFilter"
import s from "./Card-list.module.scss"
import {PaginationButton} from "../../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../common/hook/hook";
import {ChangeEvent, useEffect, useState} from "react";
import {addCardTC, fetchCardsTC, setCards} from "../../../../bll/reducers/cardsReducer";
import Button from "@mui/material/Button/Button";
import {PATH} from "../../../../utils/path";


export const CardList = () => {
    const params = useParams()
    const {cardsPack_id, userID, packName} = params
    const {pageCount, cardQuestion, sortCards, page} = useAppSelector(state => state.cards)
    const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const id = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(fetchCardsTC({cardsPack_id, sortCards, cardQuestion, pageCount, page}))
        }
    }, [])

    const setPages = (page: number) => {
        if (cardsPack_id) {
            dispatch(fetchCardsTC({cardsPack_id, sortCards, page, pageCount, cardQuestion}))
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
            dispatch(addCardTC(question.trim(), answer.trim()))
        }
        setQuestion("")
    }

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.currentTarget.value)
    }
    const navigateToLearn = () => {
        dispatch(setCards([]))
        navigate(`${PATH.LEARN}/${cardsPack_id}/${userID}/${packName}`)
    }

    return (
        <div className={s.CardListContainer}>
            <NavLink to={PATH.PACK}>return to PackList</NavLink>
            <div className={s.CardListHeader}>
                {id === userID
                    ? <div className={s.CardListHeaderTitle}>
                        My Pack
                    </div>
                    : <div className={s.CardListHeaderTitle}>
                        Friend's Pack
                    </div>}

                <div className={s.CardListHeaderButton}>
                    {id === userID
                        ? <Button onClick={openHandler} variant="contained">{"Add new card"}</Button>
                        : <Button onClick={navigateToLearn} variant="contained">{"Learn to pack"}</Button>
                    }
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
            <CardFilter userID={userID} id={id}/>
            <PaginationButton pageCount={pageCount} totalCount={totalCount} setPages={setPages}/>
        </div>

    )
}
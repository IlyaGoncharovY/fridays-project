import {Card} from "./Card/Card"
import s from "./cardFilter.module.scss"
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../common/hook/hook";
import {NotFound} from "../../../../NotFound/NotFound";
import {fetchCardsTC} from "../../../../../bll/reducers/cardsReducer";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



type CardFilterType = {
    userID: string | undefined
    id: string
}

export const CardFilter = ({userID, id}: CardFilterType) => {

    const {cards, sortCards, cardQuestion, pageCount, cardsPack_id, page} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()
    const sortUpdate = (sortCards: string) => {
        dispatch(fetchCardsTC({cardsPack_id, sortCards, cardQuestion, pageCount, page}))
    }
    return (
        <div className={s.filterWindow}>
            <table style={{textAlign: "left"}}>
                <thead>
                <tr style={{fontSize: "25px"}}>
                    <th>Question</th>
                    <th>Answer</th>
                    <th className={s.update}>
                        {sortCards[0] === "0"
                            ?
                            <span className={s.up} onClick={() => sortUpdate("1updated")}>Last Updated<ExpandLessIcon/></span>
                            : <span className={s.down}
                                    onClick={() => sortUpdate("0updated")}>Last Updated<ExpandMoreIcon/></span>
                        }
                    </th>
                    <th className={s.grade}>
                        {sortCards[0] === "0"
                            ? <span className={s.up} onClick={() => sortUpdate("1grade")}>Grade<ExpandLessIcon/></span>
                            : <span className={s.down}
                                    onClick={() => sortUpdate("0grade")}>Grade<ExpandMoreIcon/></span>
                        }
                    </th>
                    {id === userID && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {cards.length
                    ? cards.map(el => {
                        const transformDate = new Date(el.updated).toLocaleDateString()
                        return (
                            <Card
                                key={el._id}
                                cardID={el._id}
                                question={el.question}
                                answer={el.answer}
                                lastUpdated={transformDate}
                                grade={el.grade}
                                userID={el.user_id}
                                questionImg={el.questionImg}
                            />
                        )
                    })
                    : <th colSpan={id === userID ? 5 : 4}><NotFound/></th>}
                </tbody>
            </table>
        </div>
    )
}
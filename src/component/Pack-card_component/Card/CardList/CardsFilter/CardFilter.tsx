import {Card} from "./Card/Card"
import s from "./cardFilter.module.scss"
import {useAppSelector} from "../../../../../common/hook/hook";
import React from "react";


export const CardFilter = () => {

    const cards = useAppSelector(state => state.cards.cards)

    return (
        <div className={s.filterWindow}>
            <table style={{textAlign: "left"}}>
                <thead>
                <tr style={{fontSize: "25px"}}>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Last Updated</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cards.map(el => {
                    const transformDate = new Date(el.updated).toLocaleDateString()
                    console.log('el', el.questionImg)
                    return (
                        <Card
                            key={el._id}
                            cardID={el._id}
                            question={el.question}
                            questionImg={el.questionImg}
                            answer={el.answer}
                            lastUpdated={transformDate}
                            grade={el.grade}
                            userID={el.user_id}
                        />
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
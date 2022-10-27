import {Card} from "../Card/Card"
import s from "./cardFilter.module.scss"
import {useAppSelector} from "../../../../bll/hook/hook";
import {SearchCards} from "../../../Settings/SearchCards/SearchCards";

export const CardFilter = () => {

    const cards = useAppSelector(state => state.cards.cards)

    return (
        <div className={s.filterWindow}>
            <SearchCards/>
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
                    return (
                        <Card
                             key={el._id}
                             cardID={el._id}
                              question={el.question}
                              answer={el.answer}
                              lastUpdated={el.updated}
                              grade={el.grade}
                        />
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
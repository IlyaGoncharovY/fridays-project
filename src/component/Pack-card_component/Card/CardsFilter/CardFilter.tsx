import {TextField} from "@mui/material"
import {Card} from "../Card/Card"
import s from "./cardFilter.module.scss"
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import {useAppSelector} from "../../../../bll/hook/hook";

export const CardFilter = () => {
    //fake state
    // const card = useAppSelector(state => state.cards.colods)
    // const card = [
    //     {
    //         question: "question1",
    //         answer: "answer1",
    //         lastUpdated: "12.12.2222",
    //         grade: 3,
    //         id: "232323"
    //     }
    // ]
    // const packs = useAppSelector(state => state.cards.packs)
    // const dispatch = useAppDispatch()

    //Maxim card
    const cards = useAppSelector(state => state.cards.cards)

    return (
        <div className={s.filterWindow}>
            <div className={s.navigationWindow}>
                <TextField id="outlined-basic" label="Provide your text" variant="outlined"/>
                <div className={s.delFilter}>
                    <AutoFixOffIcon/>
                </div>
            </div>
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
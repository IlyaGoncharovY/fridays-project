import {Button, TextField} from "@mui/material"
import {Card} from "../Card/Card"
import s from "./cardFilter.module.scss"
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';

export const CardFilter = () => {
    //fake state
    const card = [
        {
            question: "question1",
            answer: "answer1",
            lastUpdated: "12.12.2222",
            grade: 3,
            id: "232323"
        }
    ]
    // const packs = useAppSelector(state => state.cards.packs)
    // const dispatch = useAppDispatch()


    return (
        <div className={s.filterWindow}>
            <div className={s.navigationWindow}>
                <TextField id="outlined-basic" label="Provide your text" variant="outlined"/>
                <div className={s.delFilter}>
                    <AutoFixOffIcon/>
                </div>
            </div>
            <div className={s.tableHeader}>
                <div className={s.tableHeaderText}>Question</div>
                <div className={s.tableHeaderText}>Answer</div>
                <div className={s.tableHeaderText}>Last Updated</div>
                <div className={s.tableHeaderText}>Grade</div>
                <div className={s.tableHeaderText}>Actions</div>
            </div>

            {card.map(el => {
                return (
                    <Card key={el.id}
                          question={el.question}
                          answer={el.answer}
                          lastUpdated={el.lastUpdated}
                          grade={el.grade}
                    />
                )
            })}

        </div>
    )
}
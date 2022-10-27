import {TextField} from "@mui/material"
import {Card} from "../Card/Card"
import s from "./cardFilter.module.scss"
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import {useAppSelector} from "../../../../bll/hook/hook";

export const CardFilter = () => {

    const cards = useAppSelector(state => state.cards.cards)

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

            {cards.map(el => {
                return (
                    <Card key={el._id}
                          cardID={el._id}
                          question={el.question}
                          answer={el.answer}
                          lastUpdated={el.updated}
                          grade={el.grade}
                    />
                )
            })}

        </div>
    )
}
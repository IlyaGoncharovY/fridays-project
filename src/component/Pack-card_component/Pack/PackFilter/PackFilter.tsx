import {Button, TextField} from "@mui/material"
import {Packs} from "../Packs/Packs"
import s from "./packFilter.module.scss"
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';

export const PackFilter = () => {
    //fake state
    const packs = [
        {
            name: "Ivan Packs",
            cards: 5,
            lastUpdated: "12.12.2222",
            userName: "Ivan Ivanov",
            actions: "hz",
            id: "232323"
        }
    ]
    // const cards = useAppSelector(state => state.cards.cards)
    // const dispatch = useAppDispatch()


    return (
        <div className={s.filterWindow}>
            <div className={s.navigationWindow}>
                <TextField id="outlined-basic" label="Provide your text" variant="outlined"/>
                <div className={s.doubleButton}>
                    <Button variant="contained">My</Button>
                    <Button variant="contained">All</Button>
                </div>
                <div>
                    Slider
                </div>
                <div className={s.delFilter}>
                    <AutoFixOffIcon/>
                </div>
            </div>
            <div className={s.tableHeader}>
                <div className={s.tableHeaderText}>Name</div>
                <div className={s.tableHeaderText}>Cards</div>
                <div className={s.tableHeaderText}>Last Updated</div>
                <div className={s.tableHeaderText}>Created by</div>
                <div className={s.tableHeaderText}>Actions</div>
            </div>

            {packs.map(el => {
                return (
                    <Packs key={el.id}
                           name={el.name}
                           cards={el.cards}
                           lastUpdated={el.lastUpdated}
                           userName={el.userName}
                    />
                )
            })}

        </div>
    )
}
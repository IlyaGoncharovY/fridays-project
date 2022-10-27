import {Button, TextField} from "@mui/material"
import {Packs} from "../Packs/Packs"
import s from "./packFilter.module.scss"
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import {useEffect} from "react";
import {fetchListsTC} from "../../../../bll/reducers/listsReducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";

export const PackFilter = () => {

    const lists = useAppSelector(state => state.lists)
    const dispatch = useAppDispatch()
    useEffect(() => {dispatch(fetchListsTC())},[])

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

            {lists.map(el => {
                return (
                    <Packs key={el._id}
                           packID={el._id}
                           name={el.name}
                           cards={el.cardsCount}
                           lastUpdated={el.updated}
                           userName={el.user_name}
                           userID={el.user_id}
                    />
                )
            })}

        </div>
    )
}
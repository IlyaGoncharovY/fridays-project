import s from "./PackFilter.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../../common/hook/hook";
import {Settings} from "../../../../Settings/Settings";
import {Pack} from "./Pack/Pack";
import {NotFound} from "../../../../NotFound/NotFound";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {fetchPacksTC} from "../../../../../bll/reducers/packsReducer";


export const PackFilter = () => {

    const packs = useAppSelector(state => state.packs.cardPacks)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const packName = useAppSelector(state => state.packs.packName)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const user_id = useAppSelector(state => state.packs.user_id)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)

    const dispatch = useAppDispatch()
    const sortUpdate = (str: string) => {
        dispatch(fetchPacksTC({page, pageCount, packName, min, max, user_id, sortPacks: str}))
    }
    return (
        <div className={s.filterWindow}>
            <Settings/>
            {packs.length
                ?
                <table style={{textAlign: "left"}}>
                    <thead>
                    <tr style={{fontSize: "25px"}}>
                        <th>Name</th>
                        <th>Cards</th>
                        <th className={s.update}>
                            {sortPacks[0] === "0"
                                ? <span className={s.up} onClick={() => sortUpdate("1updated")}>Last Updated<ExpandLessIcon /></span>
                                : <span className={s.down} onClick={() => sortUpdate("0updated")}>Last Updated<ExpandMoreIcon /></span>
                            }</th>
                        <th>Created by</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {packs.map(el => {
                        const transformDate = new Date(el.updated).toLocaleDateString()
                        return (
                            <Pack key={el._id}
                                  packID={el._id}
                                  name={el.name}
                                  cards={el.cardsCount}
                                  lastUpdated={transformDate}
                                  userName={el.user_name}
                                  userID={el.user_id}
                                  deckCover={el.deckCover}

                            />
                        )
                    })}
                    </tbody>
                </table>
                : <NotFound/>}
        </div>
    )
}
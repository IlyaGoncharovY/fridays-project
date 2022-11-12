import s from "./PackFilter.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../../common/hook/hook";
import {Settings} from "../../../../Settings/Settings";
import {Pack} from "./Pack/Pack";
import {NotFound} from "../../../../NotFound/NotFound";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {fetchPacksTC} from "../../../../../bll/reducers/packsReducer";


export const PackFilter = () => {
    const {packs, pageCount, page, packName, min, max, user_id, sortPacks} = useAppSelector(state => state.packs)

    const dispatch = useAppDispatch()
    const sortUpdate = (sortPacks: string) => {
        dispatch(fetchPacksTC({page, pageCount, packName, min, max, user_id, sortPacks}))
    }
    return (
        <div className={s.filterWindow}>
            <Settings/>
            <table style={{textAlign: "left"}}>
                <thead>
                <tr style={{fontSize: "25px"}}>
                    <th>Name</th>
                    <th>Cards</th>
                    <th className={s.update}>
                        {sortPacks[0] === "0"
                            ?
                            <span className={s.up} onClick={() => sortUpdate("1updated")}>Last Updated<ExpandLessIcon/></span>
                            : <span className={s.down}
                                    onClick={() => sortUpdate("0updated")}>Last Updated<ExpandMoreIcon/></span>
                        }
                    </th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {packs.length
                    ? packs.map(el => {
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
                    })
                    : <th colSpan={5}><NotFound/></th>}
                </tbody>
            </table>
        </div>
    )
}
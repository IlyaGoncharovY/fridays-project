import s from "./packFilter.module.scss"
import {useAppSelector} from "../../../../../common/hook/hook";
import {Settings} from "../../../../Settings/Settings";
import {Pack} from "./Pack/Pack";
import {NotFound} from "../../../../NotFound/NotFound";

export const PackFilter = () => {
    const packs = useAppSelector(state => state.packs.cardPacks)
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
                        <th>Last Updated</th>
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
                            />
                        )
                    })}
                    </tbody>
                </table>
                : <NotFound/>}
        </div>
    )
}
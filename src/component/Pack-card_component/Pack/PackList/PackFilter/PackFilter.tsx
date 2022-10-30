import {Pack} from "./Pack/Pack"
import s from "./packFilter.module.scss"
import {useAppSelector} from "../../../../../bll/hook/hook";
import {Settings} from "../../../../Settings/Settings";

export const PackFilter = () => {
    const lists = useAppSelector(state => state.lists)

    return (
        <div className={s.filterWindow}>
            <Settings/>
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
                {lists.map(el => {
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
        </div>
    )
}
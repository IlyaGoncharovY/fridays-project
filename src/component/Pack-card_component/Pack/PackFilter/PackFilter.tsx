import {Packs} from "../Packs/Packs"
import s from "./packFilter.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {useEffect} from "react";
import {Settings} from "../../../Settings/Settings";
import {fetchListsTC} from "../../../../bll/reducers/listsReducer";

export const PackFilter = () => {

    // useEffect(() => {
    //     dispatch(setCards())
    //
    // }, [])
    const lists = useAppSelector(state => state.lists)
    const dispatch = useAppDispatch()
    useEffect(() => {dispatch(fetchListsTC())},[])

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
                        <Packs key={el._id}
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
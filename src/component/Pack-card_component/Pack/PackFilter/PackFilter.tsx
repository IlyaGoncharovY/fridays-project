import {Packs} from "../Packs/Packs"
import s from "./packFilter.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {useEffect} from "react";
import {setCards} from "../../../../bll/reducers/cardsUsersReducer";
import {Settings} from "../../../Settings/Settings";

export const PackFilter = () => {
    //fake state
    // const packs = [
    //     {
    //         name: "Ivan Packs",
    //         cards: 5,
    //         lastUpdated: "12.12.2222",
    //         userName: "Ivan Ivanov",
    //         actions: "hz",
    //         id: "232323"
    //     }
    // ]
    // const packs = useAppSelector(state => state.cards.packs)
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cardPack)
    // const packs = [
    //     {
    //         name: "Ivan Packs",
    //         cards: 5,
    //         lastUpdated: "12.12.2222",
    //         userName: "Ivan Ivanov",
    //         actions: "hz",
    //         id: "232323"
    //     }
    // ]
    // const cards = useAppSelector(state => state.cards.cards)
    // const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setCards())

    }, [])

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
                {cards.map(el => {
                    const transformDate = new Date(el.updated).toLocaleDateString()
                    return (
                        <Packs key={el._id}
                               id={el._id}
                               name={el.name}
                               cards={el.cardsCount}
                               lastUpdated={transformDate}
                               userName={el.user_name}
                        />
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
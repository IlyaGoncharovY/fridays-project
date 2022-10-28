import {NavLink, useParams} from "react-router-dom"
import {CardModal} from "../../../common/modalWindow/CardModalWindow/CardModal"
import {CardFilter} from "../CardsFilter/CardFilter"
import s from "./Card-list.module.scss"
import {PaginationButtons} from "../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {changeCardsPages} from "../../../../bll/reducers/pageCardsReducer";
import {useEffect} from "react";
import {fetchCardsTC} from "../../../../bll/reducers/cardsReducer";


export const CardList = () => {
    const params = useParams()
    const id = params.cardID
    const page = useAppSelector(state => state.cardsPages.countPerPage)
    const totalCount = useAppSelector(state => state.cardsPages.cardsTotalCount)
    const dispatch = useAppDispatch()
    if(id){
        useEffect(() => {dispatch(fetchCardsTC(id))}, [])
    }
    const setPages = (value: number) => {
        dispatch(changeCardsPages(value))
    }
    return (
        <div className={s.CardListContainer}>
            <NavLink to={"/pack-list"}>return to PackList</NavLink>
            <div className={s.CardListHeader}>
                <div className={s.CardListHeaderTitle}>
                    Card list
                </div>
                <div className={s.CardListHeaderButton}>
                    <CardModal title={"Add new card"} nameModal={"Add new card"}/>
                </div>
            </div>
            <CardFilter/>
            <PaginationButtons page={page} totalCount={totalCount} setPages={setPages}/>
        </div>

    )
}
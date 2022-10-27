import {NavLink} from "react-router-dom"
import {CardModal} from "../../../common/modalWindow/CardModalWindow/CardModal"
import {CardFilter} from "../CardsFilter/CardFilter"
import s from "./card-list.module.scss"
import {PaginationButtons} from "../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";
import {changeCardsPages} from "../../../../bll/reducers/pageCardsReducer";


export const CardList = () => {
    debugger
    const page = useAppSelector(state => state.cardsPages.countPerPage)
    const totalCount = useAppSelector(state => state.cardsPages.cardsTotalCount)

    // const id = useAppSelector(state => state.cards.cardsPack_id)
    const dispatch = useAppDispatch()
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
import {PacksModal} from "../../../common/modalWindow/PackModal"
import {PackFilter} from "./PackFilter/PackFilter"
import s from "./pack-list.module.scss"
import { PaginationButtons } from "../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";

import { Navigate } from "react-router-dom"
import {changePages} from "../../../../bll/reducers/pageReducer";
import {useEffect} from "react";
import {fetchListsTC} from "../../../../bll/reducers/listsReducer";


export const PackList = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const page = useAppSelector(state => state.page.countPerPage)
    const totalCount = useAppSelector(state => state.page.cardPacksTotalCount)
    const dispatch = useAppDispatch()
    const setPages = (value : number) => {
        dispatch(changePages(value))
    }
    useEffect(() => {dispatch(fetchListsTC())},[])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderTitle}>

                </div>
                <div className={s.PackListHeaderButton}>
                    <PacksModal title={"Add new pack"} nameModal={"Add new pack"}/>
                </div>
            </div>
            <PackFilter/>
            <PaginationButtons page={page} totalCount={totalCount} setPages={setPages}/>
        </div>
    )
}
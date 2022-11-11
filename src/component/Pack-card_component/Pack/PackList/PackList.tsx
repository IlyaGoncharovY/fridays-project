import {PacksModal} from "../../../../common/ModalWindow/PackModalWindow/PacksModal"
import {PackFilter} from "./PackFilter/PackFilter"
import s from "./PackList.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../common/hook/hook";
import {Navigate} from "react-router-dom"
import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {addPackTC, fetchPacksTC} from "../../../../bll/reducers/packsReducer";
import {PaginationButton} from "../../../../common/Pagination/Pagination";
import {PATH} from "../../../../utils/path";


export const PackList = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const packName = useAppSelector(state => state.packs.packName)
    const user_id = useAppSelector(state => state.packs.user_id)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPacksTC({pageCount, max, min, user_id, packName, sortPacks}))
    },[])

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

    const openHandler = () => {
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
    }
    const setPages = (page: number) => {
        dispatch(fetchPacksTC({page, pageCount, max, min, packName, user_id, sortPacks}))
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addPackHandler = () => {
        if (title.trim()) {
            dispatch(addPackTC(title.trim()))
        }
        setTitle("")
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderButton}>
                    <Button onClick={openHandler} variant="contained">{"Add new pack"}</Button>
                    <PacksModal
                        open={open}
                        closeHandler={closeHandler}
                        thunkCallBack={addPackHandler}
                        onChange={onChangeTitleHandler}
                        nameModal={"ADD NEW PACK"}
                        label={"enter title of list"}
                    />
                </div>
            </div>
            <PackFilter/>
            <PaginationButton pageCount={pageCount} totalCount={totalCount} setPages={setPages}/>
        </div>
    )
}
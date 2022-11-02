import {PacksModal} from "../../../common/modalWindow/packModalWindow/PacksModal"
import {PackFilter} from "./PackFilter/PackFilter"
import s from "./pack-list.module.scss"
import {PaginationButtons} from "../../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../../bll/hook/hook";

import {Navigate} from "react-router-dom"
import {changePages} from "../../../../bll/reducers/pageReducer";
import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {addListTC, fetchListsTC} from "../../../../bll/reducers/listsReducer";
import Button from "@mui/material/Button";


export const PackList = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const page = useAppSelector(state => state.page.countPerPage)
    const totalCount = useAppSelector(state => state.page.cardPacksTotalCount)

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const setPages = (value: number) => {
        dispatch(changePages(value))
    }

    useEffect(() => {dispatch(fetchListsTC())},[])

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addPackHandler = () => {
        if (title.trim()) {
            dispatch(addListTC(title.trim()))
        }
        setTitle("")
    }


    useEffect(() => {
        dispatch(fetchListsTC())
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderTitle}>

                </div>
                <div className={s.PackListHeaderButton}>
                    <Button onClick={openHandler}>{"Add new pack"}</Button>
                    <PacksModal
                        open={open}
                        closeHandler={closeHandler}
                        thunkCallBack={addPackHandler}
                        onChange={onChangeTitleHandler}
                        nameModal={"Add new pack"}
                    />
                </div>
            </div>
            <PackFilter/>
            <PaginationButtons page={page} totalCount={totalCount} setPages={setPages}/>
        </div>
    )
}
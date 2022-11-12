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
import {transformImageInBase64} from "../../../../utils/transformImageInBase64";


export const PackList = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const {pageCount, cardPacksTotalCount, max, min, packName, user_id, sortPacks}  = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPacksTC({pageCount, max, min, user_id, packName, sortPacks}))
    }, [])

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")
    const [isChecked,setIsChecked] = useState(false)

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
            dispatch(addPackTC(title.trim(), file, isChecked))
        }
        setTitle("")
        setFile("")
    }
    const getFile = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  && event.currentTarget.files.length){
            transformImageInBase64(event.currentTarget.files[0],  (file: string)=>{
                setFile(file)
            })
        }
    }
    const PrivatePack = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.currentTarget.checked)
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
                        getFile={getFile}
                        PrivatePack={PrivatePack}
                    />
                </div>
            </div>
            <PackFilter/>
            <PaginationButton pageCount={pageCount} totalCount={cardPacksTotalCount} setPages={setPages}/>
        </div>
    )
}
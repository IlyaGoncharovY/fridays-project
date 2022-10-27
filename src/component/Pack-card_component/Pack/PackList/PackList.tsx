import {Button} from "@mui/material"
import {useState} from "react"
import {PacksModal} from "../../../common/modalWindow/PackModal"
import {PackFilter} from "../PackFilter/PackFilter"
import s from "./pack-list.module.scss"
import {Settings} from "../../../Settings/Settings";
import { PaginationButtons } from "../../../common/Pagination/Pagination";


export const PackList = () => {

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
            <PaginationButtons/>
        </div>
    )
}
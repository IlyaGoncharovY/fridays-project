import {Button} from "@mui/material"
import {useState} from "react"
import {PacksModal} from "../../../common/modalWindow/PackModal"
import {PackFilter} from "../PackFilter/PackFilter"
import s from "./pack-list.module.scss"


export const PackList = () => {

    return (
        <div className={s.PackListContainer}>
            <div className={s.PackListHeader}>
                <div className={s.PackListHeaderTitle}>
                    Pack list
                </div>
                <div className={s.PackListHeaderButton}>
                    <PacksModal title={"Add new pack"}/>
                </div>
            </div>
            <PackFilter/>
            <div>Pagination</div>
        </div>
    )
}
import {Button} from "@mui/material"
import {useState} from "react"
import { NavLink } from "react-router-dom"
import {PacksModal} from "../../../common/modalWindow/PackModal"
import {CardFilter} from "../CardsFilter/CardFilter"
import s from "./card-list.module.scss"


export const CardList = () => {

    return (
            <div className={s.CardListContainer}>
                <NavLink to={"/pack-list"}>return to PackList</NavLink>
                <div className={s.CardListHeader}>
                    <div className={s.CardListHeaderTitle}>
                        Card list
                    </div>
                    <div className={s.CardListHeaderButton}>
                        <PacksModal title={"Add new card"} nameModal={"Add new card"}/>
                    </div>
                </div>
                <CardFilter/>
                <div>Pagination</div>
        </div>

    )
}
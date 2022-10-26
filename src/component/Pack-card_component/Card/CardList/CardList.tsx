import {Button} from "@mui/material"
import {useState} from "react"
import { NavLink } from "react-router-dom"
import { CardModal } from "../../../common/modalWindow/CardModalWindow/CardModal"
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
                        <CardModal title={"Add new card"} nameModal={"Add new card"}/>
                    </div>
                </div>
                <CardFilter/>
                <div>Pagination</div>
        </div>

    )
}
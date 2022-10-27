import {Icon, IconButton} from "@mui/material"
import s from "./pasks.module.scss"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from "react-router-dom";
import {useAppDispatch} from "../../../../bll/hook/hook";
import {setColods} from "../../../../bll/reducers/cardsUsersReducer";

type PacksType = {
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
    id : string
}

export const Packs = (props: PacksType) => {
    const dispatch = useAppDispatch()
    const addHandler = () => {

    }

    const editHandler = () => {

    }

    const deleteHandler = () => {

    }
    const test = (e : any,id : string) => {
      dispatch(setColods(id))
    }
    return (
        <div className={s.packsContainer}>

            <div className={s.packBody}>
                <NavLink to={"/card-list"}>
                    <div onClick={(e)=>test(e,props.id)}>{props.name}</div>
                </NavLink>
                    <div>{props.cards}</div>
                    <div>{props.lastUpdated}</div>
                <div>{props.userName}</div>
                <div>
                    <AddCircleOutlineIcon onClick={addHandler}/>
                    <EditIcon onClick={editHandler}/>
                    <DeleteIcon onClick={deleteHandler}/>
                </div>

            </div>
        </div>

    )
}
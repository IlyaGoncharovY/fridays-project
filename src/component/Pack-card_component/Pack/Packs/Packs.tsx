import {Icon, IconButton} from "@mui/material"
import s from "./pasks.module.scss"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type PacksType = {
    name: string,
    cards: number,
    lastUpdated: string,
    userName: string,
}

export const Packs = (props: PacksType) => {

    const addHandler = () => {

    }

    const editHandler = () => {

    }

    const deleteHandler = () => {

    }

    return (
        <div className={s.packsContainer}>

            <div className={s.packBody}>
                <div>{props.name}</div>
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
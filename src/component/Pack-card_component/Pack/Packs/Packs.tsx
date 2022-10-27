import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";

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
        <tr>
            <th style={{padding: "22px"}}>
                <NavLink to={"/card-list"}>
                    {props.name}
                </NavLink>
            </th>

            <th>{props.cards}</th>
            <th>{props.lastUpdated}</th>
            <th>{props.userName}</th>
            <th>
                <AddCircleOutlineIcon onClick={addHandler}/>
                <EditIcon onClick={editHandler}/>
                <DeleteIcon onClick={deleteHandler}/>
            </th>
        </tr>

    )
}
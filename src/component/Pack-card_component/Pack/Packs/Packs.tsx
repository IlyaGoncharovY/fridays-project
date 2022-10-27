import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
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
        <tr>
            <th style={{padding: "22px"}}>
                <NavLink to={"/card-list"}>
                    <div onClick={(e)=>test(e,props.id)}>{props.name}</div>
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
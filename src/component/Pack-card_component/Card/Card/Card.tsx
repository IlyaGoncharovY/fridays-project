import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type PacksType = {
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
}

export const Card = (props: PacksType) => {

    const addHandler = () => {

    }

    const editHandler = () => {

    }

    const deleteHandler = () => {

    }

    return (
        <tr>
            <th style={{padding: "22px"}}>{props.question}</th>
            <th>{props.answer}</th>
            <th>{props.lastUpdated}</th>
            <th>{props.grade}</th>
            <th>
                <AddCircleOutlineIcon onClick={addHandler}/>
                <EditIcon onClick={editHandler}/>
                <DeleteIcon onClick={deleteHandler}/>
            </th>
        </tr>
    )
}
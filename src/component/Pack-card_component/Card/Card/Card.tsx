import s from "./card.module.scss"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type PacksType = {
    cardID: string
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
        <div className={s.CardContainer}>

            <div className={s.CardBody}>
                <div>{props.question}</div>
                <div>{props.answer}</div>
                <div>{props.lastUpdated}</div>
                <div>{props.grade}</div>
                <div>
                    <AddCircleOutlineIcon onClick={addHandler}/>
                    <EditIcon onClick={editHandler}/>
                    <DeleteIcon onClick={deleteHandler}/>
                </div>

            </div>
        </div>

    )
}
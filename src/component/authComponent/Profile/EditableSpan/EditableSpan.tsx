import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import s from "../Profile.module.scss"
import EditIcon from "@mui/icons-material/Edit";

type EditableSpanType = {
    onChangeName: (name: string) => void
    name: string
}

export const EditableSpan = ({name, onChangeName}: EditableSpanType) => {
    //state
    const [editMode, setEditMode] = useState<boolean>(false)
    let [newName, setNewName] = useState<string>("")
    //function
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)

    }
    const addNewName = () => {

        if (newName.trim().length === 0 || newName.length > 40) {
            return alert('Please enter correct field: Name')

        } else {
            onChangeName(newName)
            setEditMode(!editMode)
        }
    }
    const editHandler = () => {
        setEditMode(!editMode)
        setNewName(name)
    }
    //interface
    return (
        editMode
            ?
            <span className={s.editableForm}>
                <TextField
                    value={newName}
                    variant={"standard"}
                    onChange={onChangeHandler}
                    autoFocus
                />
                <Button style={{position: "absolute"}} variant="outlined" size="small" onClick={addNewName}>
                    Save
                </Button>
            </span>

            : <span>{name}<EditIcon className={s.editIcon}
                                    onClick={editHandler}/>
            </span>
    );
}

export default EditableSpan;
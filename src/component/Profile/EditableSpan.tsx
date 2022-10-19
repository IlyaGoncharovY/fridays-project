import {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import s from "./profile.module.scss"

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
        setEditMode(!editMode)
        if (newName !== "") {
            onChangeName(newName)
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
            <div className={s.editableForm}>
                <TextField value={newName}
                           variant={"standard"}
                           onChange={onChangeHandler}
                           autoFocus
                />
                <Button className={s.buttonSave} variant="outlined" size="small" onClick={addNewName}>
                    Save
                </Button>
            </div>

            : <span onDoubleClick={editHandler}>{name}</span>
    );
}

export default EditableSpan;
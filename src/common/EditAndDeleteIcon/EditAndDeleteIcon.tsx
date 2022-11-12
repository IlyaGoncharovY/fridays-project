import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import s from "./EditAndDelete.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

type EditAndDeleteIconType = {
    openEdit: ()=>void
    openDelete: ()=>void
}

export const EditAndDeleteIcon = (props: EditAndDeleteIconType) => {
    return (
        <>
            <IconButton color={'inherit'}>
            <EditIcon onClick={props.openEdit} className={s.editIcon}/>
            </IconButton>
            <IconButton color={'inherit'}>
            <DeleteIcon onClick={props.openDelete} className={s.deleteIcon}/>
            </IconButton>
        </>
    );
};


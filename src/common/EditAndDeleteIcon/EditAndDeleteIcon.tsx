import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import s from "./EditAndDelete.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";

type EditAndDeleteIconType = {
    openEdit: ()=>void
    openDelete: ()=>void
}

export const EditAndDeleteIcon = (props: EditAndDeleteIconType) => {
    return (
        <>
            <EditIcon onClick={props.openEdit} className={s.editIcon}/>
            <DeleteIcon onClick={props.openDelete} className={s.deleteIcon}/>
        </>
    );
};


import * as React from 'react';
import {BasicModal} from "../BasicModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import s from "./DeleteModal.module.scss"

type ModalType = {
    nameModal: string
    open: boolean
    closeHandler: () => void
    thunkCallBack: () => void
    packID?: string
    name?: string
    question?: string
}

export const DeleteModal = (props: ModalType) => {

    return (
        <div>
            <BasicModal open={props.open} closeHandler={props.closeHandler}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.nameModal}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Are you really want to remove: {props.name || props.question}?
                    <div className={s.buttons}>
                        <Button variant="outlined"
                                onClick={props.closeHandler}>cancel</Button>
                        <Button variant="contained"
                                color="error"
                                onClick={props.thunkCallBack}>delete</Button>
                    </div>
                </Typography>
            </BasicModal>
        </div>
    );
}
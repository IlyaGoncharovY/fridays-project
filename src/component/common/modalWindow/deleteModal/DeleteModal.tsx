import * as React from 'react';
import {BasicModal} from "../BasicModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type ModalType = {
    nameModal: string
    open: boolean
    closeHandler: ()=> void
    thunkCallBack: ()=>void
    packID?: string
    name?: string
}

export const DeleteModal = (props: ModalType) => {

    return (
        <div>
            <BasicModal open={props.open} closeHandler={props.closeHandler}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.nameModal}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Are you sure you want to delete the deck: {props.name}?
                    <div>
                        <Button variant="outlined"
                                onClick={props.closeHandler}>cancel</Button>
                        <Button variant="outlined"
                                onClick={props.thunkCallBack} style={{backgroundColor:"coral"}}>delete</Button>
                    </div>
                </Typography>
            </BasicModal>
        </div>
    );
}
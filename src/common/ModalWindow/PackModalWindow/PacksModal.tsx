import * as React from 'react';
import {ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./PackModal.module.scss"
import {BasicModal} from "../BasicModal";

type ModalType = {
    nameModal: string
    open: boolean
    closeHandler: ()=> void
    thunkCallBack:()=>void
    label?:string
    onChange?:(event: ChangeEvent<HTMLInputElement>) => void
    packID?: string
    name?: string
    title?:string

}

export const PacksModal = (props: ModalType) => {

    return (
        <div>
                <BasicModal open={props.open} closeHandler={props.closeHandler}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.nameModal}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div className={s.modalBody}>
                            <TextField id="standard-basic"
                                       value={props.title}
                                       label={props.label}
                                       variant="standard"
                                       onChange={props.onChange}/>
                            <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                            <div className={s.buttons}>
                                <Button variant="outlined"
                                        style={{width: "100px"}}
                                        onClick={props.closeHandler}>cancel</Button>
                                <Button variant="contained"
                                        style={{width: "100px"}}
                                        onClick={props.thunkCallBack}>save</Button>
                            </div>

                        </div>
                    </Typography>
                </BasicModal>
        </div>
    );
}
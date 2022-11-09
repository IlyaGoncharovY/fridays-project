import * as React from 'react';
import {ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./PackModal.module.scss"
import {BasicModal} from "../BasicModal";
import Stack from '@mui/material/Stack';

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
    getFile?:(event: ChangeEvent<HTMLInputElement>) => void
    PrivatePack?:(event: ChangeEvent<HTMLInputElement>) => void

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
                            <div className={s.btn}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Button style={{width: '100%'}} variant="contained" component="label">
                                        Download the cover for the pack
                                        <input hidden accept="image/*" multiple type="file" onChange={
                                            // (e)=>props.getFile(e)
                                            props.getFile
                                        } />
                                    </Button>
                                </Stack>
                            </div>
                            <FormControlLabel control={<Checkbox onChange={props.PrivatePack}/>} label="Private pack"/>
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
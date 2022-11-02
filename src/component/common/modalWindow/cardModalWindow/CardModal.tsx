import * as React from 'react';
import {ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./CardModal.module.scss"
import {BasicModal} from "../BasicModal";

type ModalType = {
    open: boolean
    closeHandler: () => void
    thunkCallBack: () => void
    onChangeQuestion: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeAnswer: (event: ChangeEvent<HTMLInputElement>) => void
    nameModal?: string
    nameInput?: string
    question?: string
    answer?: string
}

export const CardModal = (props: ModalType) => {

    return (
        <div>
            <BasicModal open={props.open} closeHandler={props.closeHandler}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.nameModal || props.nameInput}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <div className={s.modalBody}>
                        <TextField id="standard-basic"
                                   value={props.question}
                                   label="Question"
                                   variant="standard"
                                   onChange={props.onChangeQuestion}/>
                        <TextField id="standard-basic"
                                   value={props.answer}
                                   label="Answer"
                                   variant="standard"
                                   onChange={props.onChangeAnswer}/>
                        <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                        <Button variant="outlined"
                                onClick={props.closeHandler}>exit</Button>
                        <Button variant="outlined"
                                onClick={props.thunkCallBack}>add</Button>
                    </div>
                </Typography>
            </BasicModal>
        </div>
    );
}
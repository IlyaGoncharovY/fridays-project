import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./CardModal.module.scss"
import {useAppDispatch} from "../../../../bll/hook/hook";
import {addCardTC} from "../../../../bll/reducers/cardsReducer";
import {BasicModal} from "../BasicModal";

type ModalType = {
    title: string
    nameModal: string
}

export const CardModal = (props: ModalType) => {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const addCardHandler = () => {
        if (question.trim()) {
            dispatch(addCardTC(question.trim()))
        }
        setQuestion("")
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }

    return (
        <div>
            <Button onClick={openHandler}>{props.title}</Button>
            <BasicModal open={open} closeHandler={closeHandler}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.nameModal}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <div className={s.modalBody}>
                        <TextField id="standard-basic"
                                   value={question}
                                   label="enter question"
                                   variant="standard"
                                   onChange={onChangeTitleHandler}/>
                        <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                        <Button variant="outlined"
                                onClick={closeHandler}>cansel</Button>
                        <Button variant="outlined"
                                onClick={addCardHandler}>add</Button>
                    </div>
                </Typography>
            </BasicModal>
        </div>
    );
}
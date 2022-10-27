import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./CardModal.module.scss"
import {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../../bll/hook/hook";
import {addCardTC} from "../../../../bll/reducers/cardsReducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ModalType = {
    title: string
    nameModal: string
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}}

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
        if(question.trim()){
            dispatch(addCardTC(question.trim()))}
        setQuestion("")
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.currentTarget.value)
    }
    return (
        <div>
            <Button onClick={openHandler}>{props.title}</Button>
            <Modal
                open={open}
                onClose={closeHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                                    onClick={addCardHandler}>add</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
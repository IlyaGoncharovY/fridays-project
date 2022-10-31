import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import s from "./packModal.module.scss"
import {useAppDispatch} from "../../../../bll/hook/hook";
import {addListTC} from "../../../../bll/reducers/listsReducer";
import {BasicModal} from "../BasicModal";

type ModalType = {
    title: string
    nameModal: string
}

export const PacksModal = (props: ModalType) => {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

    const openHandler = () => {
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }

    const addPackHandler = () => {
        if(title.trim()){
        dispatch(addListTC(title.trim()))}
        setTitle("")
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
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
                                       value={title}
                                       label="enter title of list"
                                       variant="standard"
                                       onChange={onChangeTitleHandler}/>
                            <FormControlLabel control={<Checkbox defaultChecked/>} label="Private pack"/>
                            <Button variant="outlined"
                                    onClick={closeHandler}>cansel</Button>
                            <Button variant="outlined"
                                    onClick={addPackHandler}>add</Button>
                        </div>
                    </Typography>
                </BasicModal>
        </div>
    );
}
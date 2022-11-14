import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';
import s from "./CardModal.module.scss"
import {BasicModal} from "../BasicModal";
import {SelectForCArd} from "./SelectForCard/SelectForCArd";
import {SelectChangeEvent} from "@mui/material/Select";
import defaultAva from "../../assets/images/defaultAva.png";

type ModalType = {
    open: boolean
    closeHandler: () => void
    thunkCallBack: () => void
    onChangeQuestion: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeAnswer: (event: ChangeEvent<HTMLInputElement>) => void
    uploadHandler?: (e: ChangeEvent<HTMLInputElement>) => void
    nameModal?: string
    nameInput?: string
    question?: string
    answer?: string
    modeQuestion?: string
    modeHandleChange?: (e: SelectChangeEvent) => void
    questionImg?: string
    cardListImg?: string | null
}

export const CardModal = (props: ModalType) => {

    const [isImgBroken, setIsImgBroken] = useState(false)

    const errorHandler = () => {
        setIsImgBroken(true)
        alert('С вашей картинкой для карты, что то не так! Попробуйте другую!')
    }


    return (
        <div>
            <BasicModal open={props.open} closeHandler={props.closeHandler}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.nameModal || props.nameInput}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <div className={s.modalBody}>
                        <SelectForCArd
                            value={props.modeQuestion!}
                            onChange={props.modeHandleChange!}
                        />
                        {props.modeQuestion === "text"
                            ? <>
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
                            </>
                            : <>
                                <label className={s.questionImg}>
                                    <div className={s.img}>
                                        <img
                                            // src={isImgBroken ? defaultAva : props.questionImg || props.cardListImg!}
                                            src={props.questionImg || props.cardListImg! || defaultAva}
                                            style={{width: '100px'}}
                                            alt={"questionImg"}
                                            onError={errorHandler}
                                        />
                                    </div>
                                    <Button variant="contained" component="span">
                                        Upload button
                                    </Button>
                                    <input
                                        type={"file"}
                                        name={props.question}
                                        accept="image/*"
                                        onChange={props.uploadHandler}
                                        style={{display: 'none'}}
                                    />
                                </label>
                                <TextField id="standard-basic"
                                           value={props.answer}
                                           label="Answer"
                                           variant="standard"
                                           onChange={props.onChangeAnswer}/>
                            </>
                        }

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
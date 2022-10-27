import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

type InputRangePropsType = {
    value : number
    changeInputValue : (value : number) => void
}

export const InputRange = (props : InputRangePropsType) => {
    const onchangeHandler = (e : ChangeEvent<HTMLInputElement>) =>{
        props.changeInputValue(+e.currentTarget.value)
    }
    return (
        <TextField style={{width:55}} size='small' value={props.value} onChange={onchangeHandler}/>
    );
};


import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

export const Input: React.FC<InputPropsType> = ({placeholder, setItem,value,type}) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItem(e.currentTarget.value)
    }
    return (
        <TextField
            type={type}
            variant='standard'
            size='medium'
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={value}
        />
    );
};

//TYPES

type InputPropsType = {
    placeholder: string
    setItem: (value: string) => void
    type: string
    value : string

}
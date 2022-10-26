import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "../hookDebounce/Debounce";
import {packsAPI} from "../../../api/packAPI";

type SearchPropsType = {
    cardPacksTotalCount: any
    callback: (value: any) => void
    cardType : any
    cardRange : any

}

export const Search = (props: SearchPropsType) => {

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const [min,max] = props.cardRange
        packsAPI.getPacks({page : 1, pageCount : 8,packName : debouncedValue, user_id : props.cardType, min , max})
            .then(res=>{
                console.log(res.data)
                props.callback(res.data.cardPacks)})

    }, [debouncedValue,props.cardType,props.cardRange])
    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
    }
    return (
        <div>
            <div>Search</div>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            >
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Provide your text"
                    onChange={getInputValue}
                />
            </Paper>
        </div>
    );
};


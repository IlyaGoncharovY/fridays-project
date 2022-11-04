import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "../hookDebounce/Debounce";
import {useAppDispatch} from "../../../common/hook/hook";
import {fetchPacksTC, SearchType} from "../../../bll/reducers/packsReducer";


export const Search: React.FC<SearchType> = ({pageCount, page, min, max, packName}) => {

    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string | undefined>(packName)
    const debouncedValue = useDebounce<string | undefined>(value, 500)
    useEffect(() => {
        dispatch(fetchPacksTC({page, pageCount, packName: debouncedValue, min, max}))
    }, [debouncedValue])

    useEffect(() => {
        if (packName) {
            setValue(packName)
        }
    }, [packName])

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <div>Search</div>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 350, height: '32px'}}
            >
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Provide your text"
                    onChange={getInputValue}
                    value={value}
                />
            </Paper>
        </div>
    );
};


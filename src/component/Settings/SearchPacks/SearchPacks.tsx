import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "../hookDebounce/Debounce";
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {fetchPacksTC, SearchPacksType} from "../../../bll/reducers/packsReducer";
import {setSearchMode} from "../../../bll/reducers/appReducer";


export const SearchPacks: React.FC<SearchPacksType> = ({pageCount, page, min, max, packName, user_id, sortPacks}) => {
    const isSearchMode = useAppSelector(state => state.auth.isSearchMode)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>(packName)
    const debouncedValue = useDebounce<string>(value, 1000)
    useEffect(() => {
        if(isSearchMode) {
            dispatch(fetchPacksTC({page, pageCount, packName: debouncedValue, min, max, user_id, sortPacks}))
        }
    }, [debouncedValue])

    useEffect(() => {

        setValue(packName)
    }, [packName])

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        dispatch(setSearchMode(true))
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


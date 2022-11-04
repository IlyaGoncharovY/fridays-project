import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "../hookDebounce/Debounce";
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {fetchCardsTC} from "../../../bll/reducers/cardsReducer";
import {setSearchMode} from "../../../bll/reducers/appReducer";


export const SearchCards = () => {
    const isSearchMode = useAppSelector(state => state.auth.isSearchMode)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 1000)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    useEffect(() => {
        if(isSearchMode) {
            dispatch(fetchCardsTC({cardsPack_id, cardQuestion: debouncedValue, pageCount}))
        }
    }, [debouncedValue])


    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        dispatch(setSearchMode(true))
    }
    return (
        <div>
            <div>Search</div>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 350,height : '32px'}}
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


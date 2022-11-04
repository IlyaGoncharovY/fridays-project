import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {InputRange} from "./InputRange/InputRange";
import {useDebounce} from "../hookDebounce/Debounce";
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {fetchPacksTC, SearchType} from "../../../bll/reducers/packsReducer";
import {setSearchMode} from "../../../bll/reducers/appReducer";


export const NumberOfCards: React.FC<SearchType> = ({pageCount, page, min, max, packName, user_id, sortPacks}) => {

    const isSearchMode = useAppSelector(state => state.auth.isSearchMode)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<number[]>([0, 110]);
    const debouncedValue = useDebounce<number[]>(value, 500)

    useEffect(() => {
        if (isSearchMode) {
            const [min, max] = debouncedValue
            dispatch(fetchPacksTC({page, pageCount, min, max, packName, user_id, sortPacks}))
        }
    }, [debouncedValue])

    useEffect(() => {
        setValue([min, max])
    }, [min, max])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
        dispatch(setSearchMode(true))
    };
    const changeInputRangeValueLeft = (num: any) => {
        setValue([num, value[1]])
        dispatch(setSearchMode(true))
    }
    const changeInputRangeValueRight = (num: any) => {
        setValue([value[0], num])
        dispatch(setSearchMode(true))
    }

    return (
        <div>
            <div>Number of cards</div>
            <div style={{display: 'flex'}}>
                <InputRange value={value[0]} changeInputValue={changeInputRangeValueLeft}/>

                <Box sx={{width: 200, display: 'flex', margin: '3px 20px 0'}}>

                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={110}
                    />

                </Box>
                <InputRange value={value[1]} changeInputValue={changeInputRangeValueRight}/>
            </div>
        </div>

    );
};








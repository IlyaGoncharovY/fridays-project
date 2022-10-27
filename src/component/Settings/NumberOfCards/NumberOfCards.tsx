import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {InputRange} from "./InputRange/InputRange";
import {useDebounce} from "../hookDebounce/Debounce";
import {SearchType, setSearchFilter, setSearchMode} from "../../../bll/reducers/searchReducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hook/hook";


export const NumberOfCards: React.FC<SearchType> = ({pageCount, page, packName}) => {
    const [value, setValue] = useState<number[]>([0, 110]);
    const debouncedValue = useDebounce<number[]>(value, 500)
    const searchMode = useAppSelector(state => state.search.searchMode)
    const dispatch = useAppDispatch()
    const [min, max] = debouncedValue
    useEffect(() => {
        if (searchMode) {
            dispatch(setSearchFilter({page, pageCount, min, max, packName}))
        }
    }, [debouncedValue])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        dispatch(setSearchMode(true))

    };
    const changeInputRangeValueLeft = (num: any) => {
        setValue([num, value[1]])
    }
    const changeInputRangeValueRight = (num: any) => {
        setValue([value[0], num])
    }

    return (
        <div>
            <div>Number of cards</div>
            <div style={{display: 'flex'}}>
                <InputRange value={value[0]} changeInputValue={changeInputRangeValueLeft}/>

                <Box sx={{width: 200, display: 'flex', margin : '3px 20px 0'}}>

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








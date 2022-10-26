import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {InputRange} from "./InputRange/InputRange";
import {useDebounce} from "../hookDebounce/Debounce";


type NumberOfCardsPropsType = {
    getCardRange: (value: number[]) => void
}

export const NumberOfCards = (props:NumberOfCardsPropsType) => {
    const [value, setValue] = useState<number[]>([0, 54]);
    const debouncedValue = useDebounce<number[]>(value, 500)
    console.log(value)
    useEffect(()=>{
        props.getCardRange(debouncedValue)
    },[debouncedValue])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);

    };
    const changeInputRangeValueLeft = (num : any) => {
        setValue([num,value[1]])
    }
    const changeInputRangeValueRight = (num : any) => {
        setValue([value[0],num])
    }

    return (
        <div>
            <div>Number of cards</div>
            <Box sx={{width: 300, display: 'flex'}}>
                <InputRange value={value[0]} changeInputValue={changeInputRangeValueLeft}/>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={54}
                />
                <InputRange value={value[1]} changeInputValue={changeInputRangeValueRight}/>
            </Box>
        </div>

    );
};








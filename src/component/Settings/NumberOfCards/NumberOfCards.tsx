import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {InputRange} from "./InputRange/InputRange";
import {useDebounce} from "../hookDebounce/Debounce";
import {useAppDispatch} from "../../../common/hook/hook";
import {fetchPacksTC, SearchType} from "../../../bll/reducers/packsReducer";


export const NumberOfCards: React.FC<SearchType> = ({pageCount, page,min,max}) => {
    const [value, setValue] = useState<number[]>([0, 110]);
    const debouncedValue = useDebounce<number[]>(value, 500)
    const dispatch = useAppDispatch()

    useEffect(() => {
            const [min, max] = debouncedValue
            dispatch(fetchPacksTC({page, pageCount, min, max}))
    }, [debouncedValue])

    useEffect(()=>{
        if(min && max) {
            setValue([min, max])
        }
    },[min,max])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
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








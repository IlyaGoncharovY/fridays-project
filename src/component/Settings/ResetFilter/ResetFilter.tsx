import React from 'react';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {resetFilter} from "../../../bll/reducers/searchReducer";
import {useAppDispatch} from "../../../bll/hook/hook";

export const ResetFilter = () => {
    const dispatch = useAppDispatch()
    return (
        <div style={{alignSelf:'end'}} onClick={()=>{dispatch(resetFilter())}}>
           <FilterAltOffIcon/>
        </div>
    );
};


import React from 'react';
import {useAppDispatch} from "../../../common/hook/hook";
import {fetchPacksTC} from "../../../bll/reducers/packsReducer";
import s from "./ResetFilter.module.css"
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


export const ResetFilter = () => {
        const min = 0
        const max = 110
        const packName = ""
        const pageCount = 8
        const page = 1
        const user_id = ""
    const dispatch = useAppDispatch()
    return (
        <div className={s.resetIcon} onClick={()=>{dispatch(fetchPacksTC({min, max, packName, pageCount, page, user_id}))}}>
           <FilterAltOffIcon/>
        </div>
    );
};


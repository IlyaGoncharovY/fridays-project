import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {fetchPacksTC, SearchPacksType} from "../../../bll/reducers/packsReducer";


export const ShowPacks:React.FC<SearchPacksType> = ({pageCount,page,user_id,packName, max, min, sortPacks}) => {
    const id = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
    const showMyCards = () => {
        console.log()
        dispatch(fetchPacksTC({page, user_id: id, pageCount, max, min, packName, sortPacks}))
    }
    const showAllCards = () => {
        dispatch(fetchPacksTC({page, user_id: "", pageCount, max, min, packName, sortPacks}))
    }
    return (
        <div>
            <div>Show packs cards</div>
            <ButtonGroup>
                <Button variant={!!user_id ? 'contained' : 'outlined'} onClick={showMyCards}>My</Button>
                <Button variant={!!user_id ? 'outlined' : 'contained'} onClick={showAllCards}>All</Button>
            </ButtonGroup>
        </div>
    );
};


import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../common/hook/hook";
import {fetchPacksTC, SearchType} from "../../../bll/reducers/packsReducer";



export const ShowCards:React.FC<SearchType> = ({pageCount,page}) => {
    const user_id = useAppSelector(state => state.profile._id)
    const allCards = useAppSelector(state => state.packs.user_id)
    const dispatch = useAppDispatch()
    const showMyCards = () => {
        dispatch(fetchPacksTC({page, user_id, pageCount}))
    }
    const showAllCards = () => {
        dispatch(fetchPacksTC({page,user_id : "", pageCount}))
    }
    return (
        <div>
            <div>Show packs cards</div>
            <ButtonGroup>
                <Button variant={!!allCards ? 'contained' : 'outlined'} onClick={showMyCards}>My</Button>
                <Button variant={!!allCards ? 'outlined' : 'contained'} onClick={showAllCards}>All</Button>
            </ButtonGroup>
        </div>
    );
};


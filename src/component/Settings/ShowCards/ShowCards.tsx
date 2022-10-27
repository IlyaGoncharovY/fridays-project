import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../bll/hook/hook";
import {SearchType, setSearchFilter} from "../../../bll/reducers/searchReducer";



export const ShowCards:React.FC<SearchType> = ({pageCount,page}) => {
    const userId = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
    const showMyCards = () => {
        dispatch(setSearchFilter({page,user_id : userId, pageCount}))

    }
    const showAllCards = () => {
        dispatch(setSearchFilter({page,user_id : "", pageCount}))
    }
    return (
        <div>
            <div>Show packs cards</div>
            <ButtonGroup>
                <Button variant={!userId ? 'contained' : 'outlined'} onClick={showMyCards}>My</Button>
                <Button variant={!userId ? 'outlined' : 'contained'} onClick={showAllCards}>All</Button>
            </ButtonGroup>
        </div>
    );
};


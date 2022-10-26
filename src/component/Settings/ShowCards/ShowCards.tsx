import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppSelector} from "../../../bll/hook/hook";

type showCardsPropsType = {
    showCards : (value : number | string) => void
}

export const ShowCards = (props:showCardsPropsType) => {
    const userId = useAppSelector(state => state.profile._id)
    const showMyCards = () => {
        props.showCards(userId)

    }
    const showAllCards = () => {
       props.showCards('')
    }
    return (
        <div>
            <div>Show packs cards</div>
            <ButtonGroup>
                <Button variant="contained" onClick={showMyCards}>My</Button>
                <Button variant="outlined" onClick={showAllCards}>All</Button>
            </ButtonGroup>
        </div>
    );
};


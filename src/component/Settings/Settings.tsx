import React, {useState} from 'react';
import {Search} from "./Search/Search";
import {ShowCards} from "./ShowCards/ShowCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {ResetFilter} from "./ResetFilter/ResetFilter";
import {PackType, ResponseGetPackType} from "../../api/packAPI";
import { PaginationButtons } from '../common/Pagination/Pagination';


export const Settings = () => {
    const [value, setValue] = useState<null | ResponseGetPackType>(null)
    const [cardPack, setCardPack] = useState<PackType[]>([])
    const [cardRange, setCardRange] = useState<number[]>([])
    const [cardType, setCardType] = useState<number | string>("")
    const setItems = (item: any) => {
        setCardPack(item)
    }
    const showCards = (value: number | string) => {
        setCardType(value)
    }
    const getCardRange = (value : any) =>{
        setCardRange(value)
    }

    return (
        <div style={{display: "flex"}}>
            <Search cardPacksTotalCount={value?.cardPacksTotalCount} callback={setItems}
                    cardType={cardType}
                    cardRange={cardRange}
            />
            <ShowCards showCards={showCards}/>
            <NumberOfCards getCardRange={getCardRange}/>
            <ResetFilter/>
            <div>{cardPack.map(u => <div key={u._id}>{u.name} <span>-----{u.cardsCount}</span></div>)}</div>
            <PaginationButtons/>
        </div>
    );
};

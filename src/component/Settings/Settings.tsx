import React from 'react';
import {Search} from "./Search/Search";
import {ShowCards} from "./ShowCards/ShowCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {ResetFilter} from "./ResetFilter/ResetFilter";
import {useAppSelector} from '../../common/hook/hook';


export const Settings = () => {

    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const name = useAppSelector(state => state.packs.packName)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    return (
        <div style={{display: "flex", justifyContent:'space-between' ,flexWrap:'wrap'}}>
            <Search page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <ShowCards page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <NumberOfCards  page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <ResetFilter/>
        </div>
    );
};

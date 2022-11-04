import React from 'react';
import {Search} from "./Search/Search";
import {ShowCards} from "./ShowCards/ShowCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {ResetFilter} from "./ResetFilter/ResetFilter";
import {useAppSelector} from '../../common/hook/hook';


export const Settings = () => {

    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const packName = useAppSelector(state => state.packs.packName)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const user_id = useAppSelector(state => state.packs.user_id)
    const sortPacks = useAppSelector(state => state.packs.sortPacks)

    return (
        <div style={{display: "flex", justifyContent:'space-between' ,flexWrap:'wrap'}}>
            <Search page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <ShowCards page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <NumberOfCards  page={page} pageCount={pageCount} packName={packName} min={min} max={max} user_id={user_id} sortPacks={sortPacks}/>
            <ResetFilter/>
        </div>
    );
};

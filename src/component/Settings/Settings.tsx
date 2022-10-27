import React from 'react';
import {Search} from "./Search/Search";
import {ShowCards} from "./ShowCards/ShowCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {ResetFilter} from "./ResetFilter/ResetFilter";
import {useAppSelector} from '../../bll/hook/hook';


export const Settings = () => {

    const pageCount = useAppSelector(state => state.page.countPerPage)
    const page = useAppSelector(state => state.page.page)
    const name = useAppSelector(state => state.search.packName)
    const min = useAppSelector(state => state.search.min)
    const max = useAppSelector(state => state.search.max)

    return (
        <div style={{display: "flex"}}>
            <Search page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <ShowCards page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <NumberOfCards  page={page} pageCount={pageCount} packName={name} min={min} max={max}/>
            <ResetFilter/>
        </div>
    );
};

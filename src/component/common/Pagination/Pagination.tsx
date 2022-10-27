import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../../bll/hook/hook";
import {changePages} from "../../../bll/reducers/pageReducer";


export const PaginationButtons = () => {

    const dispatch = useAppDispatch()
    const page = useAppSelector(state => state.page.countPerPage)
    const totalCount = useAppSelector(state => state.page.cardPacksTotalCount)
    const pages = Math.ceil(totalCount / page)
    const handleChange = (event: any, value: number) => {
        dispatch(changePages(value))
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={pages} showFirstButton showLastButton onChange={handleChange}
            />

        </Stack>

    );
}
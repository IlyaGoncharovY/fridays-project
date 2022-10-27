import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../../bll/hook/hook";
import {changePages} from "../../../bll/reducers/pageReducer";


export const PaginationButtons = (props : any) => {

    debugger

    const pages = Math.ceil(props.totalCount / props.page)
    const handleChange = (event: any, value: number) => {
        props.setPages(value)

    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={pages} showFirstButton showLastButton onChange={handleChange}
            />

        </Stack>

    );
}
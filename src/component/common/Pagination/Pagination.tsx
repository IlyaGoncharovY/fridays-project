import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PaginationButtons = (props : any) => {



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
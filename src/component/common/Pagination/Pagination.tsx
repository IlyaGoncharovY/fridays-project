import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export const PaginationButtons = () => {
    const pages = Math.ceil(241 / 8)//заглушка 241 это cardPacksTotalCount 8 это сколько будет элемментов на странице
    const handleChange = (event: any, value: any) => {
        console.log(value)
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={pages} showFirstButton showLastButton onChange={handleChange}
            />

        </Stack>

    );
}
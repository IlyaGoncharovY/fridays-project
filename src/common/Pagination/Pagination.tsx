import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
type PaginationButtonType = {
    pageCount: number
    totalCount: number
    setPages: (value: number) => void
}

export const PaginationButton = (props : PaginationButtonType) => {
    const pages = Math.ceil(props.totalCount / props.pageCount)

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
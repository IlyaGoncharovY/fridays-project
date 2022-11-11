import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

type HalfRating = {
    grade : number
}

export const HalfRating = (props : HalfRating) => {
    return (
        <Stack spacing={1}>
            <Rating
                size='small' defaultValue={props.grade} precision={0.1} readOnly />
        </Stack>
    );
}
import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () =>{
    return (
        <Stack sx={{ color: 'grey.500', justifyContent : 'center' , height: "100vh", alignItems : 'center'}} spacing={2} direction="row">
            <CircularProgress color="secondary" size={"150px"} />
        </Stack>
    );
}
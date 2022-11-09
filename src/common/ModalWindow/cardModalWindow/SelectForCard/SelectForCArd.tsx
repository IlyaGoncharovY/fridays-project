import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type SelectForCArdType = {
    value: string
    onChange: (e: SelectChangeEvent) => void
}

export const SelectForCArd = (props: SelectForCArdType) => {

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    label="Choose a question format"
                    onChange={props.onChange}
                >
                    <MenuItem value={"text"}>text</MenuItem>
                    <MenuItem value={"picture"}>picture</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
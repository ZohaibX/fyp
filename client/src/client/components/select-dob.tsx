import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelectDOB({
    value,
    setValue,
    title,
    data,
    address = 'no',
    disabled = false
}) {
    return (
        <Box
            sx={{ minWidth: 120 }}
            className={address === 'yes' && 'address-width'}
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    disabled={disabled}
                    //   native
                    onChange={(e) => setValue(e.target.value as string)}
                >
                    {data.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

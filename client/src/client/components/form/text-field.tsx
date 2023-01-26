import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Text({
    label,
    value,
    setValue,
    type = '',
    updateCurrentPage = (x) => x,
    setPageX = (x) => x,
    setPage = (x) => x
}) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="standard-basic"
                    type={type === 'age' ? 'number' : type}
                    value={value}
                    // type={type}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                        updateCurrentPage(1);
                        setPageX(1);
                        setPage(1);
                    }}
                    label={label}
                    variant="standard"
                />
            </div>
        </Box>
    );
}

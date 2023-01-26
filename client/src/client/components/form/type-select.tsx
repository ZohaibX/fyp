import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TypeSelect({
  type,
  setType,
  updateCurrentPage = (x) => x,
}) {
  const handleChange = (event) => {
    setType(event.target.value);
    updateCurrentPage(1);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Item Types</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Item Type"
          onChange={handleChange}
        >
          <MenuItem value={'A'}>Accessory</MenuItem>
          <MenuItem value={'F'}>Food</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

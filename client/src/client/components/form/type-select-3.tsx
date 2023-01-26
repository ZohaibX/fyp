import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TypeSelect3({
  type,
  ageSearch,
  setAgeSearch,
  genderSearch,
  setGenderSearch,
  updateCurrentPage,
  setPageX,
}) {
  const handleChange = (event) => {
    updateCurrentPage(1);
    setPageX(0);
    if (type === 'age') setAgeSearch(event.target.value);
    else setGenderSearch(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {type === 'age' ? 'Age' : 'Gender'}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type === 'age' ? ageSearch : genderSearch}
          label="Item Type"
          onChange={handleChange}
        >
          <MenuItem value={type === 'age' ? 'Adult' : 'Male'}>
            {type === 'age' ? 'Adult' : 'Male'}
          </MenuItem>
          <MenuItem value={type === 'age' ? 'Baby' : 'Female'}>
            {type === 'age' ? 'Baby' : 'Female'}
          </MenuItem>
          {type !== "age" && <MenuItem value="Not Sure">
            Not Sure
            </MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}

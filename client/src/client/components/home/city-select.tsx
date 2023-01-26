import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CitySelect({
  value,
  setValue,
  updateCurrentPage = (x) => x,
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="City"
          onChange={handleChange}
        >
          {cities.map((city) => (
            <MenuItem value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const cities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Multan',
  'Gujranwala',
  'Peshawar',
  'Quetta',
  'Sargodha',
  'Sialkot',
  'Faisalabad',
  'Sheikhupura',
  'Kasur',
];

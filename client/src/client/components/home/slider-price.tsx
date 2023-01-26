import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function ColorSlider({
  setSearchPrice,
  value,
  updateCurrentPage,
}) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        value={value}
        // getAriaValueText={
        //   // (value) => setSearchPrice(value * 1000 * 5)
        //   // updateCurrentPage(1);
        // }
        onChange={(e) => {
          setSearchPrice(e.target.value);
        }}
        color="secondary"
      />
    </Box>
  );
}

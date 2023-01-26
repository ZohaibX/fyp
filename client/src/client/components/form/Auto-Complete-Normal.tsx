import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  parrotBreeds,
  pigeonBreeds,
  swanBreeds,
  duckBreeds,
} from '../../pages/ads/data';

export default function NormalSelect({ label, value, setValue }) {
  const options = [
    'Lahore',
    'Gujranwala',
    'Karachi',
    'Islamabad',
    'Multan',
    'RawalPindi',
    'Murree',
  ];
  const defaultProps = {
    options,
    getOptionLabel: (option) => option,
  };

  return (
    <div>
      <Autocomplete
        className="post-select"
        style={{ width: '200px', marginTop: '6px' }}
        {...defaultProps}
        id="disable-close-on-select"
        value={value}
        onChange={(event, newInputValue) => setValue(newInputValue)}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
      />
    </div>
  );
}

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const option = [
//   'The Shawshank Redemption',
//   'The Godfather',
//   'The Godfather: Part II',
//   ,
// ];

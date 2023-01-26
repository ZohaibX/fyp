import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {
  parrotBreeds,
  pigeonBreeds,
  swanBreeds,
  duckBreeds,
} from '../../pages/ads/data';

export default function BirdNameSelect({ label, value, setValue, all }) {
  const birdOptions = ['Parrot', 'Pigeon', 'Ducks', 'Swan'];

  return (
    <div>
      <Autocomplete
        className="search-item post-select"
        style={{ marginTop: '6px' }}
        options={
          all === 'yes' ? ['All Birds', ...birdOptions] : [...birdOptions]
        }
        value={value}
        sx={{ width: 300 }}
        onChange={(event, newInputValue) => {
          if (newInputValue === null) setValue('');
          else setValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
      />

      <br />
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

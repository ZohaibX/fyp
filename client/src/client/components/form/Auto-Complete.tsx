import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  parrotBreeds,
  pigeonBreeds,
  swanBreeds,
  duckBreeds,
} from '../../pages/ads/data';

export default function Select({ label, value, setValue, birdName, all }) {
  let options;
  if (all === 'yes') {
    options = ['All Breeds'].concat(
      pigeonBreeds,
      swanBreeds,
      duckBreeds,
      parrotBreeds
    );
  } else {
    options = pigeonBreeds.concat(
      pigeonBreeds,
      swanBreeds,
      duckBreeds,
      parrotBreeds
    );
  }
  return (
    <div>
      <Autocomplete
        className="search-item post-select"
        style={{ marginTop: '6px' }}
        options={
          (birdName === 'Parrot' && parrotBreeds) ||
          (birdName === 'Swan' && swanBreeds) ||
          (birdName === 'Ducks' && duckBreeds) ||
          (birdName === 'Pigeon' && pigeonBreeds) ||
          options
        }
        id="disable-close-on-select"
        sx={{ width: 300 }}
        value={value}
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

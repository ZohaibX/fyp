import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function ListModal({ value, setValue, list }) {
  return (
    <Autocomplete
      id="free-solo-demo species-select-1"
      freeSolo
      value={value}
      options={list.map((option) => option)}
      onInputChange={(e, newInputValue) => setValue(newInputValue)}
      renderInput={(params) => <TextField {...params} label="Bird Specie" />}
    />
  );
}

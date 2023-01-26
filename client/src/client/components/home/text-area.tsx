import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MaxHeightTextarea({ description }) {
  return (
    <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      value={description}
      style={{
        width: '100%',
        textAlign: 'justify',
        height: '300px',
        border: 'none',
      }}
    />
  );
}

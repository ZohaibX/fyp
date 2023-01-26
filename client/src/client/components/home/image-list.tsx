import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BasicTabs from './text-box';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList({ imageUrls }) {
  return (
    <div>
      <ImageList
        sx={{
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: 'translateZ(0)',
        }}
        id="image-list"
        rowHeight={500}
        gap={1}
      >
        {imageUrls &&
          imageUrls.map((item) => {
            const cols = 2;
            const rows = 2;
            return (
              <ImageListItem key={item.img} cols={cols} rows={rows}>
                <img {...srcset(item, 250, 200, rows, cols)} loading="lazy" />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  position="top"
                />
              </ImageListItem>
            );
          })}
      </ImageList>
    </div>
  );
}

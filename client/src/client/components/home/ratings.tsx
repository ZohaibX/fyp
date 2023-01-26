import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { keys } from '../../../config/keys';

export default function BasicRating({ itemId, currentUser }) {
  const [value, setValue] = React.useState<number | null>(0);

  React.useEffect(() => {
    const getAd = async () => {
      const { data } = await Axios.get(
        `${keys.BACKEND}/api/ads/get-ad/${itemId}`
      );

      setValue(
        Math.ceil(data.ratings.totalRatings / data.ratings.RatingIndividuals)
      );
    };

    getAd();
  }, []);

  return (
    <Rating
      className="ratings-1"
      name="simple-controlled"
      value={value}
      onChange={async (event, newValue) => {
        if (!currentUser) return alert('Please Login First!');

        setValue(newValue);
        await Axios.put(`${keys.BACKEND}/api/ads/update-ad-ratings/${itemId}`, {
          rate: newValue,
        });
      }}
    />
  );
}

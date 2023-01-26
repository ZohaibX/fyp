import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import Ratings from './ratings';
import FoodCard from './food-card';

const RightLayout = ({
  ad,
  appear="",
  itemId,
  genderSearch,
  ageSearch,
  searchTitleSpecie,
  searchCity,
  searchType,
  searchPrice,
  searchBirdAge,
  currentUser,
  ads,
}) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <div>
      <FoodCard
        ad={ad}
        genderSearch={genderSearch}
        ageSearch={ageSearch}
        searchTitleSpecie={searchTitleSpecie}
        searchCity={searchCity}
        searchType={searchType}
        searchPrice={searchPrice}
        searchBirdAge={searchBirdAge}
        currentUser={currentUser}
        itemId={itemId}
        ads={ads}
        appear={appear}
      />
    </div>
  );
};

export default RightLayout;

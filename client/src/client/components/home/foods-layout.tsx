import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import FoodCard2 from './food-card-2';

const FoodsLayout = ({
  item,
  currentUser,
  itemId,
  genderSearch  = "",
  ageSearch = "",
  searchTitleSpecie = "",
  searchCity = "",
  searchType = "",
  searchPrice = "",
  searchBirdAge = "",
  items,
  appearx = "" ,
  page = '',
  quantity,
  setQuantity,
  appear101 = ""
}) => {
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    const fetchCurrentUserData = async () => {
      const { data } = await Axios.get(
        `${keys.BACKEND}/api/users/currentUserData`
      );

      let likedAds, index;
      if (data.data) {
        likedAds = [...data.data.likedAds];
        index = likedAds.indexOf(itemId);

        if (index >= 0) {
          setLiked(true);
        } else setLiked(false);
      }
    };
    fetchCurrentUserData();
  }, []);

  return (
    <div>
      <FoodCard2
        item={item}
        currentUser={currentUser}
        itemId={itemId}
        genderSearch={genderSearch}
        ageSearch={ageSearch}
        searchTitleSpecie={searchTitleSpecie}
        searchCity={searchCity}
        searchType={searchType}
        searchPrice={searchPrice}
        searchBirdAge={searchBirdAge}
        items={items}
        page={page}
        quantity={quantity}
        setQuantity={setQuantity}
        appearx={appearx}
      />
    </div>
  );
};

export default FoodsLayout;

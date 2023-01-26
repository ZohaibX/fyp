import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import Ratings from './ratings';
import LikeButton from './like-btn';
import LikeButton2 from './like-button-2';
import BasicRating2 from './ratings-2';
import QuantitySelect from './quantity-select';

const FoodCard3 = ({
  item,
  currentUser,
  itemId,
  page,
  quantity,
  setQuantity,
}) => {
  let ITEMID;
  
  return (
    <div className="ad" key={ITEMID} style={{ position: 'relative' }}>
      <Link
        to={`/item-details-${btoa(ITEMID)}-${btoa('OrderIdTest')}-details-x`}
        className="ad-image"
      >
        <img className="ad-image-img" src={item.images[0]} alt="" />
      </Link>
      <div className="ad-data">
        <Link
          to={`/item-details-${btoa(ITEMID)}-${btoa('OrderIdTest')}-details-x`}
          style={{ textDecoration: 'none', color: 'black' }}
          className="ad-data-title"
        >
          {item.title}
        </Link>
        <Link
          to={`/item-details-${btoa(ITEMID)}-${btoa('OrderIdTest')}-details-x`}
          style={{ textDecoration: 'none', color: 'black' }}
          className="ad-data-title ad-data-title-x"
        >
          <span className="ad-data-title-x-x">For Specie/s: </span>
          {item.specie[0]} {item.specie[1] ? '...' : null}
        </Link>
        <div className="ad-data-price">
          Rs. {item.price}{' '}
          {page === 'cart' && (
            <span style={{ fontSize: '1rem', fontWeight: '400' }}>
              {item.quantity} item/s
            </span>
          )}
        </div>
        <div className="ad-data-address-x">
          For
          <span className="ad-data-address-x-x" style={{ fontWeight: 'Bold' }}>
            {item.birdAge}
          </span>
          {''} Birds
        </div>
      </div>

      <div className="icon-btn">
        <LikeButton2 currentUser={currentUser} adId={item && item.id} />
      </div>

      <div className="ratings">
        <BasicRating2 itemId={itemId} currentUser={currentUser} />
      </div>

      {page === 'cart' && (
        <div
          onClick={async () => {
            try {
              await Axios.delete(
                `${keys.BACKEND}/api/user/deleteOrder/${item._id}`
              );
              window.location.reload();
            } catch (error) {
              return alert('Something Went Wrong');
            }
          }}
          className="btn btn-danger"
          id="cart-btn"
        >
          Delete
        </div>
      )}

      <div className="cart-quantity">
        {page === 'cart' && (
          <QuantitySelect
            quantity={quantity}
            setQuantity={setQuantity}
            id={item._id}
            item={item}
          />
        )}
      </div>
    </div>
  );
};

export default FoodCard3;

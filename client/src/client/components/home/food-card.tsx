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

const FoodCard = ({
    ad,
    genderSearch,
    ageSearch,
    searchTitleSpecie,
    searchCity,
    searchType,
    searchPrice,
    searchBirdAge,
    currentUser,
    itemId,
    appear = '',
    ads
}) => {
    // if (!ad) return <h4>Error Occurred -- on Food Card</h4>;
    return (
        <div className="ad" key={ad && ad.id}>
            {ad && ad.sold && (
                <p className="sold-tag">
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/ad-details-${btoa(ad && ad.id)}-${btoa(
                            ad && ad.userId
                        )}-details-x`}
                    >
                        SOLD
                    </Link>
                </p>
            )}

            <Link
                to={`/ad-details-${btoa(ad && ad.id)}-${btoa(
                    ad && ad.userId
                )}-details-x`}
                className="ad-image"
            >
                <img className="ad-image-img" src={ad && ad.images[0]} alt="" />
            </Link>
            <div className="ad-data">
                <Link
                    to={`/ad-details-${btoa(ad && ad.id)}-${btoa(
                        ad && ad.userId
                    )}-details-x`}
                    style={{ textDecoration: 'none', color: 'black' }}
                    className="ad-data-title"
                >
                    {ad && ad.title}
                </Link>
                <Link
                    to={`/ad-details-${btoa(ad && ad.id)}-${btoa(
                        ad && ad.userId
                    )}-details-x`}
                    style={{ textDecoration: 'none', color: 'black' }}
                    className="ad-data-title ad-data-title-x"
                >
                    <span className="ad-data-title-x-x">For Specie/s: </span>
                    {ad && ad.specieName}
                </Link>
                <div className="ad-data-price">
                    Rs. {ad && ad.price} {''}
                    {appear != 'no' && (
                        <Link to={`/viewing-items-for-${ad.birdName}`}>
                            <span className="btn-x102">
                                view food items for {ad.birdName}s
                            </span>
                        </Link>
                    )}
                </div>
                <div className="ad-data-address">
                    {ad && ad.locationDetails}, {ad && ad.city}
                    <span className="" style={{ fontWeight: 'bold' }}>
                        {ad &&
                            ad.date &&
                            `Posted on: ${ad && ad.date.slice(0, 10)}`}
                    </span>
                </div>
            </div>

            <div className="icon-btn">
                <LikeButton currentUser={currentUser} adId={ad && ad.id} />
            </div>

            <div className="ratings">
                <Ratings itemId={itemId} currentUser={currentUser} />
            </div>
        </div>
    );
};

export default FoodCard;

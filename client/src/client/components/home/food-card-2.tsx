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

const FoodCard2 = ({
    item,
    currentUser,
    itemId,
    genderSearch,
    ageSearch,
    searchTitleSpecie,
    searchCity,
    searchType,
    searchPrice,
    searchBirdAge,
    items,
    page,
    quantity,
    setQuantity,
    appearx = '',
    appear101 = ''
}) => {
    let ITEMID;
    if (page === 'cart') ITEMID = item.itemId;
    else ITEMID = itemId;

    if (appearx === 'yes') ITEMID = item.itemId;
    else ITEMID = itemId;

    if (item.itemId) ITEMID = item.itemId;
    console.log('ITEM:  ', item);
    console.log('Quantity:  ', quantity);

    // if (!ad) return <h4>Error Occurred -- on Food Card</h4>;
    return (
        <div className="ad" key={ITEMID} style={{ position: 'relative' }}>
            {page !== 'no-stock' ? (
                <Link
                    to={`/item-details-${btoa(ITEMID)}-${btoa(
                        'OrderIdTest'
                    )}-details-x`}
                    className="ad-image"
                >
                    <img className="ad-image-img" src={item.images[0]} alt="" />
                </Link>
            ) : (
                <a
                    href={`/item-details-${btoa(ITEMID)}-${btoa(
                        'OrderIdTest'
                    )}-details-x`}
                    className="ad-image"
                >
                    <img className="ad-image-img" src={item.images[0]} alt="" />
                </a>
            )}
            <div className="ad-data">
                {page !== 'no-stock' ? (
                    <Link
                        to={`/item-details-${btoa(ITEMID)}-${btoa(
                            'OrderIdTest'
                        )}-details-x`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        className="ad-data-title"
                    >
                        {item.title}
                    </Link>
                ) : (
                    <a
                        href={`/item-details-${btoa(ITEMID)}-${btoa(
                            'OrderIdTest'
                        )}-details-x`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        className="ad-data-title"
                    >
                        {item.title}
                    </a>
                )}
                {page !== 'no-stock' ? (
                    <Link
                        to={`/item-details-${btoa(ITEMID)}-${btoa(
                            'OrderIdTest'
                        )}-details-x`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        className="ad-data-title ad-data-title-x"
                    >
                        <span className="ad-data-title-x-x">
                            For Specie/s:{' '}
                        </span>
                        {item.specie[0]} {item.specie[1] ? '...' : null}
                    </Link>
                ) : (
                    <a
                        href={`/item-details-${btoa(ITEMID)}-${btoa(
                            'OrderIdTest'
                        )}-details-x`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        className="ad-data-title ad-data-title-x"
                    >
                        <span className="ad-data-title-x-x">
                            For Specie/s:{' '}
                        </span>
                        {item.specie[0]} {item.specie[1] ? '...' : null}
                    </a>
                )}
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
                    <span
                        className="ad-data-address-x-x"
                        style={{ fontWeight: 'Bold' }}
                    >
                        {item.birdAge}
                    </span>
                    {''} Birds
                </div>
            </div>

            <div className="icon-btn">
                <LikeButton2 currentUser={currentUser} adId={item && item.id} />
            </div>

            {page !== 'cart' &&
                page !== 'no-stock' &&
                page !== 'searched' &&
                page !== 'orders' && (
                    <p className="items-left">
                        Stock:{' '}
                        <span className="quantity">
                            {item && item.quantity}
                        </span>{' '}
                        Items
                    </p>
                )}
            {page === 'orders' && (
                <p className="items-left">
                    Stock:{' '}
                    <span className="quantity">{item && item.quantity}</span>{' '}
                    Items More
                </p>
            )}

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

export default FoodCard2;

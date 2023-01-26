import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import CustomImageList from '../../components/home/image-list';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCurrentUser } from '../../Store/actions';
import BasicTabs2 from '../../components/home/basic-tabs-2';
import NormalSelect from '../../components/form/Auto-Complete-Normal';
import Text from '../../components/form/text-field';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import AdCarousel from '../../components/home/caousel';
import TextField from '@mui/material/TextField';

const ItemDetails = (props) => {
    const id = atob(props.match.params.id);
    const orderId = atob(props.match.params.orderId);
    const [data, setData] = React.useState([]);
    const [userData, setUserData] = React.useState([]);
    const [error, setError] = React.useState('');
    const [faqValue, setFaqValue] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [locationDetails, setLocationDetails] = React.useState('');
    const [otherAds, setOtherAds] = React.useState([]);
    const [ordering, setOrdering] = React.useState('Add To Cart');

    React.useEffect(() => {
        const fetchItemDetails = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-item/${id}`
            );
            const { data: otherAdsData } = await Axios.get(
                `${keys.BACKEND}/api/ads/display-specific-ads/${data.birdName}`
            );
            setData(data);
            setOtherAds(otherAdsData);
        };
        fetchItemDetails();
        const getCurrentData = async () => {
            const { data } = await Axios(
                `${keys.BACKEND}/api/users/currentUserData`
            );
            setUserData(data.data);
        };
        getCurrentData();

        props.fetchCurrentUser();
    }, []);

    let title;
    if (data.id) title = data.specie;
    else title = 'Item Details';

    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`${title}`}</title>
        </Helmet>
    );

    console.log('getRecommendedAds: ', otherAds);

    const deleteAd = async () => {
        try {
            await Axios.delete(
                `${keys.BACKEND}/api/ads/delete-item/${data.id}`
            );

            window.location = '/';
        } catch (error) {
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    const orderItem = async (itemId) => {
        setOrdering('Adding To The Cart');

        if (data.quantity <= 0)
            return alert('This item is not currently available.');

        try {
            const order = await Axios.put(
                `${keys.BACKEND}/api/users/add-order/${itemId}`
            );
            setOrdering('Order in your Cart');
            // window.location = '/get-my-ads';
        } catch (error) {
            setOrdering('Add To Cart');
            return alert(error.response.data.errors[0].message.toUpperCase());
        }
    };

    const deleteOrder = async () => {
        try {
            await Axios.delete(
                `${keys.BACKEND}/api/ads/delete-order/${orderId}`
            );
            window.location = '/get-my-ads';
        } catch (error) {
            return alert(
                "There's some error occurred while cancelling your order"
            );
        }
    };

    let newAds = [];
    console.log('OTHER ADS X: ', otherAds);
    if (otherAds.length > 5) {
        newAds.push(otherAds[0]);
        newAds.push(otherAds[1]);
        newAds.push(otherAds[2]);
        newAds.push(otherAds[3]);
        newAds.push(otherAds[4]);
        newAds.push(otherAds[6]);
    } else {
        newAds = [...otherAds];
    }

    // console.log('N3W ADS X: ', newAds);
    console.log('Data: ', data);

    return (
        <div className="details-page">
            {head()}

            <div className="ad-details-flex">
                <div className="carousel-x">
                    <h2 className="text-center  carousel-x-h2 my-2">
                        {data.title}
                    </h2>
                    {/* <p className="carousel-x-p">
                        <i className="fa-solid  fa-location-pin"></i>{' '}
                        {userData.address}, {userData.city} {userData.state}
                    </p> */}
                    <AdCarousel images={data.images} specie={data.specieName} />

                    <div
                        className="carousel-x-description"
                        style={{ marginTop: '5rem' }}
                    >
                        <h5 className="carousel-x-description-h5">
                            Description
                        </h5>
                        <p className="carousel-x-description-p">
                            {data.description}
                        </p>
                    </div>

                    {props.currentUser &&
                        props.currentUser.role !== 'Admin' && (
                            <br className="br-mixin" />
                        )}

                    {/* UPDATE DELETE BUTTONS */}
                    <div
                        className="ad-details-buttons"
                        style={{ marginTop: '-2rem !important' }}
                    >
                        {props.currentUser &&
                        props.currentUser.role === 'Admin' ? (
                            <div>
                                <p
                                    className=" ad-details-buttons-delete"
                                    onClick={deleteAd}
                                >
                                    Delete Ad
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <br className="br-mixin" />
                    {/* UPDATE DELETE BUTTONS */}

                    {/* HIDDEN MIXIN DATA */}

                    <div
                        className="important-details important-details-hidden"
                        style={{ marginTop: '-5rem !important' }}
                    >
                        <div className="important-details-pricing">
                            <div className="important-details-pricing-price">
                                PKR {data.price}
                            </div>
                        </div>

                        <div
                            className="carousel-x-table"
                            style={{ marginTop: '-4rem' }}
                        >
                            <DenseTable2 items="yes" data={data} />
                        </div>

                        {userData && userData.role !== 'Admin' && (
                            <p
                                style={{ marginTop: '2rem' }}
                                className="add-to-cart-btn"
                                onClick={() => orderItem(id)}
                                disabled={
                                    ordering === 'Order in your Cart'
                                        ? true
                                        : false
                                }
                            >
                                <i class="fa-solid fa-cart-shopping add-to-cart-btn-icon"></i>{' '}
                                {ordering}
                            </p>
                        )}

                        {userData && userData.role === 'Admin' && (
                            <div className="icon-style-x">
                                <TextField
                                    className="icon-style-x-text"
                                    value={faqValue}
                                    onChange={(e) =>
                                        setFaqValue(e.currentTarget.value)
                                    }
                                    id="standard-basic-x"
                                    label="Add FAQs..."
                                    variant="standard"
                                />
                                <p
                                    className="btn bg-x bg-w icon-style-x-send "
                                    onClick={async () => {
                                        if (faqValue.length) {
                                            try {
                                                await Axios.put(
                                                    `${keys.BACKEND}/api/items/add-faq/${data.id}`,
                                                    { faq: faqValue }
                                                );
                                                window.location.reload();
                                            } catch (error) {
                                                console.log(error);
                                                return alert(
                                                    'Something Went Wrong'
                                                );
                                            }
                                        }
                                    }}
                                >
                                    Add
                                </p>
                            </div>
                        )}

                        {data && data.faqs && data.faqs.length ? (
                            <div className="faqs">
                                <h5 className="faqs-h5">Faqs</h5>

                                <ol className="faqs-ol">
                                    {data && data.faqs && data.faqs.length
                                        ? data.faqs.map((item, index) => {
                                              return (
                                                  <li
                                                      className="faqs-li"
                                                      key={index}
                                                  >
                                                      {item}
                                                      {userData &&
                                                          userData.role ===
                                                              'Admin' && (
                                                              <span
                                                                  className="faqs-li-delete"
                                                                  onClick={async () => {
                                                                      try {
                                                                          await Axios.delete(
                                                                              `${keys.BACKEND}/api/items/delete-faq/${data.id}/${index}`,
                                                                              {
                                                                                  faq: faqValue
                                                                              }
                                                                          );
                                                                          window.location.reload();
                                                                      } catch (error) {
                                                                          console.log(
                                                                              error
                                                                          );
                                                                          return alert(
                                                                              'Something Went Wrong'
                                                                          );
                                                                      }
                                                                  }}
                                                              >
                                                                  {' '}
                                                                  delete
                                                              </span>
                                                          )}
                                                  </li>
                                              );
                                          })
                                        : null}
                                </ol>
                            </div>
                        ) : null}

                        <div className="my-5 ">
                            <h1 className="text-center my-5 font-weight-bolder">
                                Ads You may Like
                            </h1>

                            {otherAds.map((item) => (
                                <FoodsLayout
                                    items={otherAds}
                                    item={item}
                                    itemId={item && item.id}
                                    currentUser={props.currentUser}
                                />
                            ))}

                            <p className="underline">
                                _________________________________________________
                            </p>
                        </div>

                        <br />
                    </div>
                </div>

                <div className="important-details">
                    <div className="important-details-pricing">
                        <div className="important-details-pricing-price">
                            PKR {data.price}
                        </div>
                    </div>

                    <div
                        className="carousel-x-table"
                        style={{ marginTop: '-4rem' }}
                    >
                        <DenseTable2 items="yes" data={data} />
                    </div>

                    {userData && userData.role !== 'Admin' && (
                        <p
                            style={{ marginTop: '2rem' }}
                            className="add-to-cart-btn"
                            onClick={() => orderItem(id)}
                            disabled={
                                ordering === 'Order in your Cart' ? true : false
                            }
                        >
                            <i class="fa-solid fa-cart-shopping add-to-cart-btn-icon"></i>{' '}
                            {ordering}
                        </p>
                    )}

                    {userData && userData.role === 'Admin' && (
                        <div className="icon-style-x">
                            <TextField
                                className="icon-style-x-text"
                                value={faqValue}
                                onChange={(e) =>
                                    setFaqValue(e.currentTarget.value)
                                }
                                id="standard-basic-x"
                                label="Add Frequently Asked Questions..."
                                variant="standard"
                            />
                            <p
                                className="btn bg-x icon-style-x-send bg-w"
                                onClick={async () => {
                                    if (faqValue.length) {
                                        try {
                                            await Axios.put(
                                                `${keys.BACKEND}/api/items/add-faq/${data.id}`,
                                                { faq: faqValue }
                                            );
                                            window.location.reload();
                                        } catch (error) {
                                            console.log(error);
                                            return alert(
                                                'Something Went Wrong'
                                            );
                                        }
                                    }
                                }}
                            >
                                Add
                            </p>
                        </div>
                    )}

                    {data && data.faqs && data.faqs.length ? (
                        <div className="faqs">
                            <h5 className="faqs-h5">Faqs</h5>

                            <ol className="faqs-ol">
                                {data && data.faqs && data.faqs.length
                                    ? data.faqs.map((item, index) => {
                                          return (
                                              <li
                                                  className="faqs-li"
                                                  key={index}
                                              >
                                                  {item}
                                                  {userData &&
                                                      userData.role ===
                                                          'Admin' && (
                                                          <span
                                                              className="faqs-li-delete"
                                                              onClick={async () => {
                                                                  try {
                                                                      await Axios.delete(
                                                                          `${keys.BACKEND}/api/items/delete-faq/${data.id}/${index}`,
                                                                          {
                                                                              faq: faqValue
                                                                          }
                                                                      );
                                                                      window.location.reload();
                                                                  } catch (error) {
                                                                      console.log(
                                                                          error
                                                                      );
                                                                      return alert(
                                                                          'Something Went Wrong'
                                                                      );
                                                                  }
                                                              }}
                                                          >
                                                              {' '}
                                                              delete
                                                          </span>
                                                      )}
                                              </li>
                                          );
                                      })
                                    : null}
                            </ol>
                        </div>
                    ) : null}
                </div>
            </div>

            {props.currentUser && props.currentUser.role === 'Admin' && <br />}

            {props.currentUser && props.currentUser.role === 'Admin' && <br />}

            {props.currentUser && props.currentUser.role === 'Admin' && <br />}

            {props.currentUser && props.currentUser.role === 'Admin' && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}
            {props.currentUser &&
                props.currentUser.role === 'Admin' &&
                newAds.length < 3 && <br />}

            {/* <br />
            {/* <br />
            {/* <br />
            {/* <br />
            <br />
            <br /> */}

            <div className="my-5 hide">
                <h1 className="text-center my-5 font-weight-bolder">
                    Ads You may Like
                </h1>

                <div className="divide">
                    {newAds.length &&
                        newAds.map((item) => (
                            <div className="divide-1">
                                <FoodsLayout
                                    items={newAds}
                                    item={item}
                                    itemId={item && item.id}
                                    currentUser={props.currentUser}
                                    page="no-stock"
                                />
                            </div>
                        ))}
                </div>

                <p className="underline">
                    _________________________________________________
                </p>
            </div>
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

import RequireProfileCompletion from '../../components/hocs/complete-profile';
import requireAuth from '../../components/hocs/require-auth';
import DenseTable2 from '../../components/table-2';
import currentUser from '../../../../../server/src/middlewares/current-user';
import FoodsLayout from '../../components/home/foods-layout';

export default {
    component: RequireProfileCompletion(
        requireAuth(connect(mapStateToProps, { fetchCurrentUser })(ItemDetails))
    )
};

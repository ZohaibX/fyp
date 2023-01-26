import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchCurrentUser } from '../Store/actions';
import RequireProfileCompletion from '../components/hocs/complete-profile';
import requireAuth from '../components/hocs/require-auth';
import Axios from 'axios';
import { keys } from '../../config/keys';
import FoodsLayout from '../components/home/foods-layout';
import StripeCheckout from 'react-stripe-checkout';
import Alert from '@mui/material/Alert';

const Cart = (props) => {
    const [UserData, setUserData] = React.useState([]);
    const [UserOrders, setUserOrders] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [quantity, setQuantity] = React.useState('');
    const [userPaidOrders, setUserPaidOrders] = React.useState([]);

    React.useEffect(() => {
        const userData = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/users/currentUserData`
            );
            setUserData(data.data);
            setUserOrders(data.data.orders);
            setUserPaidOrders(data.data.ordersPaid);

            // if(data && data.data && data.data.orders) {
            const currentDate = new Date(Date.now());
            const orderDate = new Date(data.data.orders[0].date);
            // console.log(currentDate.getDate(), orderDate.getDate());

            // DELETING CART ADS IN MINUTES -- CHANGE IT TO 1 DAY
            if (currentDate.getDate() !== orderDate.getDate()) {
                console.log('IM HERE');
                await Axios.delete(`${keys.BACKEND}/api/users/delete-orders`);
            }
            // }
            // if(data.data.orders)
        };
        userData();

        const ordersPrice = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/users/order-price`
            );
            setTotalPrice(data.price);
        };
        ordersPrice();
    }, []);

    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>Your Cart </title>
        </Helmet>
    );

    // console.log(totalPrice);
    // console.log('User Orders: ', UserOrders);
    // console.log('User Paid Orders: ', userPaidOrders);

    const makePayment = async (token) => {
        try {
            await Axios.post(`${keys.BACKEND}/api/user/payment/`, {
                token,
                orders: UserOrders
            });
            window.location.reload();
        } catch (error) {
            return alert('Something Went Wrong During Payment Submission');
        }
    };

    console.log('USER ORDERS: ', UserOrders);
    // console.log('USER DATA: ', UserData);

    return (
        <div style={{ minHeight: '75vh', width: '100%' }}>
            {head()}

            <h1
                className="text-center my-5"
                style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}
            >
                You Got {JSON.parse(UserOrders.length)} Item/s
            </h1>

            {userPaidOrders.length && (
                <h3
                    className="text-center my-3 orders-processing"
                    style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}
                >
                    You Have Order/s in Processing
                </h3>
            )}

            <div id="cart-items">
                {UserOrders.length
                    ? UserOrders.map((item) => (
                          <div
                              className=""
                              style={{ width: '70%', margin: '0 auto' }}
                          >
                              <FoodsLayout
                                  items={UserOrders}
                                  item={item}
                                  itemId={item && item.id}
                                  genderSearch=""
                                  ageSearch=""
                                  searchTitleSpecie=""
                                  searchCity=""
                                  searchType=""
                                  searchPrice=""
                                  searchBirdAge=""
                                  currentUser={UserData}
                                  page="cart"
                                  quantity={item.quantity}
                                  setQuantity={setQuantity}
                                  appear101="yes"
                              />
                          </div>
                      ))
                    : null}
            </div>

            {UserOrders.length ? (
                <div className="">
                    <p
                        className="text-center"
                        style={{
                            fontFamily: 'sans-serif',
                            fontSize: '.9rem',
                            marginBottom: '-1.7rem'
                        }}
                    >
                        Before Paying, Double-Check Your Contact Details in Your
                        Profile
                    </p>
                    {totalPrice < 999999 && (
                        <StripeCheckout
                            stripeKey={keys.STRIPE_PUBLISHABLE_KEY} // publisher key
                            token={makePayment}
                            name="Purchase These Items"
                            amount={totalPrice * 100} // to get amount on dollars
                            currency="PKR"
                        >
                            <p className="cart-btn">Make Your Payment</p>
                            {/* this is how we can use our own button -- otherwise we have a cool looking button by default */}
                        </StripeCheckout>
                    )}
                </div>
            ) : null}

            {totalPrice > 999999 && (
                <Alert severity="error" className="error-style">
                    Total Price Cannot Exceed Rs. 999,999
                </Alert>
            )}
            {/* <h3 className="text-center my-5">Price -- Calculated {totalPrice} </h3> */}
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}
export default {
    component: RequireProfileCompletion(
        requireAuth(connect(mapStateToProps, { fetchCurrentUser })(Cart))
    )
};

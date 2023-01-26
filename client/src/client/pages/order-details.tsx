import * as React from 'react';
import { keys } from '../../config/keys';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DenseTable from '../components/table';
import PopUpX from '../components/home/modal-x';

const OrderDetails = (props) => {
    const id = atob(props.match.params.id);
    const [orderDetails, setOrderDetails] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [info, setInfo] = React.useState('');

    React.useEffect(() => {
        const getOrderDetails = async () => {
            const { data: OrderDetails } = await Axios.get(
                `${keys.BACKEND}/api/user/get-order-details/${id}`
            );
            setOrderDetails(OrderDetails);

            const { data: userData } = await Axios.get(
                `${keys.BACKEND}/api/users/get-user-details/${OrderDetails.userId}`
            );
            setUser(userData);
        };
        getOrderDetails();
    }, []);

    const head = () => (
        <Helmet>
            <title>{`User's Order Details`}</title>
            {/* // this is how we will make our title dynamic */}
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    console.log(id);
    console.log(orderDetails);
    console.log(user);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const d = new Date(orderDetails && orderDetails.OrderedDate);

    return (
        <div className="">
            {head()}

            <p className="ordered-date">
                Ordered Date:{' '}
                <span style={{ fontWeight: 'bolder' }}>
                    {monthNames[d.getMonth()]} {d.getDate()} {d.getFullYear()}
                </span>
            </p>

            {orderDetails &&
                orderDetails.order.map((item) => (
                    <div className="">
                        <p
                            className="text-center mt-5 mb-2"
                            style={{ fontWeight: 'bold', fontSize: '1rem' }}
                        >
                            Item #{' '}
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={`/item-details-${btoa(
                                    item && item.itemId
                                )}-${btoa(item && item._id)}-details-x`}
                            >
                                {item.itemId}
                            </Link>
                        </p>
                        <DenseTable order={item} />

                        <p className="text-center my-4">
                            _____________________________________________
                        </p>
                    </div>
                ))}

            <p
                className="text-center mt-2"
                style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
            >
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/user-${btoa(
                        orderDetails && orderDetails.userId
                    )}-profile-${btoa('false')}`}
                >
                    User Details
                </Link>
            </p>
            <DenseTable user={user} />
            <p className="text-center my-4">
                _____________________________________________
            </p>

            <p
                className=" bg-x bg-w order_completed"
                onClick={async () => {
                    // return console.log(orderDetails.id);
                    if (!info.length)
                        setInfo(
                            'Are You Sure You Completed the Order ? Click Again to Continue.'
                        );
                    else {
                        try {
                            await Axios.post(
                                `${keys.BACKEND}/api/user/order-completed/${orderDetails.id}`
                            );
                            window.location = '/orders';
                        } catch (error) {
                            alert('Some Error Occured During Submission 101');
                        }
                    }
                }}
            >
                Order Delivered
            </p>
            {info.length && (
                <p
                    className="text-center mt-2"
                    style={{
                        marginBottom: '5rem',
                        fontSize: '.8rem',
                        fontWeight: 'bold'
                    }}
                >
                    {info}
                </p>
            )}
        </div>
    );
};

export default {
    component: OrderDetails
};

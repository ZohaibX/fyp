import * as React from 'react';
import { fetchCurrentUser } from '../../Store/actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { keys } from '../../../config/keys';
import { Helmet } from 'react-helmet';
import FoodsLayout from '../../components/home/foods-layout';
import { Link } from 'react-router-dom';

const Orders = (props) => {
    const [orders, setOrders] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [paidOrders, setPaidOrders] = React.useState([]);

    React.useEffect(() => {
        props.fetchCurrentUser();

        const getAllOrders = async () => {
            try {
                const { data } = await axios.get(
                    `${keys.BACKEND}/api/users/get-all-orders`
                );
                setOrders(data);
            } catch (error) {
                alert('There went something wrong!');
            }
        };
        getAllOrders();

        const getPaidOrders = async () => {
            const { data } = await axios.get(
                `${keys.BACKEND}/api/user/get-paid-orders`
            );
            setPaidOrders(data);
        };
        getPaidOrders();
    }, []);

    console.log('PAID ORDERS: ', paidOrders);

    const head = () => (
        <Helmet>
            <title>{`${paidOrders.length} Order(s) Loaded`}</title>
            {/* // this is how we will make our title dynamic */}
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    return (
        <div className="orders-page container" style={{ minHeight: '80%' }}>
            {head()}
            <div
                className="my-2 text-center"
                style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '50px',
                    letterSpacing: '2px'
                }}
            >
                ORDERS
            </div>

            {!paidOrders.length && (
                <div
                    className="my-2 text-center"
                    style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '30px',
                        // letterSpacing: '2px',
                        textDecoration: 'underline'
                    }}
                >
                    No Order Yet!
                </div>
            )}

            {/* <p className="records" ><Link className="order-details-link" to={`/records`}>Completed Orders</Link></p> */}

            {paidOrders.map((item) => (
                <div className="order-div">
                    <p className="order-details-p">
                        <Link
                            className="order-details-link"
                            to={`/order-details-${btoa(item.id)}`}
                        >
                            Order # {item.id}
                        </Link>
                    </p>
                    {item.order.map((order) => (
                        <FoodsLayout
                            items={item.order}
                            item={order}
                            itemId={order && order.id}
                            currentUser={props.currentUser}
                            appearx={'yes'}
                            page="orders"
                        />
                    ))}
                    <p className="text-center font-weight-bolder">
                        _________________________________________________________________
                    </p>
                </div>
            ))}
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default {
    // component: RequireAdmin(
    //   connect(mapStateToProps, { fetchCurrentUser })(Orders)
    // ),
    component: connect(mapStateToProps, { fetchCurrentUser })(Orders)
};

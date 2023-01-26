import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import CustomImageList from '../../components/home/image-list';
import BasicTabs from '../../components/home/text-box';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdCarousel from '../../components/home/caousel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import DenseTable2 from '../../components/table-2';

// "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"

const AdDetails = (props) => {
    const id = atob(props.match.params.id);
    const userId = atob(props.match.params.userId);

    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [error, setError] = React.useState('');
    const [sold, setSold] = React.useState(false);
    const [reported, setReported] = React.useState(false);

    React.useEffect(() => {
        const fetchAdDetails = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-ad/${id}`
            );
            const userData = await Axios.get(
                `${keys.BACKEND}/api/users/get-user-details/${data.userId}`
            );
            setData(data);
            setUser(userData.data);
            setSold(data.sold);
        };
        fetchAdDetails();
    }, []);

    let title;
    if (data.id) title = data.specieName;
    else title = 'Ad Details';

    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`${title}`}</title>
        </Helmet>
    );

    const deleteAd = async () => {
        try {
            await Axios.delete(`${keys.BACKEND}/api/ads/delete-ad/${data.id}`);

            window.location = '/';
        } catch (error) {
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    console.log('DATA: ', data);
    console.log('USER: ', user);
    return (
        <div className="" style={{ minHeight: '180vh' }}>
            {head()}

            <div
                className="ad-details-flex"
                style={{ minHeight: 'fit-content' }}
            >
                <div className="carousel-x">
                    <h2 className="text-center  carousel-x-h2 my-2">
                        {data.title}
                    </h2>
                    <p className="carousel-x-p">
                        <i className="fa-solid  fa-location-pin"></i>{' '}
                        {user.address}, {user.city} {user.state}
                    </p>
                    <AdCarousel images={data.images} specie={data.specieName} />

                    {/* HIDDEN MIXIN DATA */}

                    <div className="important-details important-details-hidden">
                        <div className="important-details-pricing">
                            <div className="important-details-pricing-price">
                                PKR {data.price}
                            </div>
                            <div className="important-details-pricing-phone-number">
                                <i class="fa-solid fa-phone important-details-pricing-phone-number-icon-style"></i>{' '}
                                {user.phoneNumber}
                            </div>
                            <div className="important-details-pricing-mail">
                                {' '}
                                <span className="important-details-pricing-mail-span">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <div className="important-details-user-details">
                            <h4 className="important-details-user-details-h4">
                                Seller Information
                            </h4>
                            {user && user.imageUrl ? (
                                <img
                                    className="important-details-user-details-img"
                                    src={user && user.imageUrl}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="important-details-user-details-img"
                                    src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                    alt=""
                                />
                            )}
                            <p className="important-details-user-details-p">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="important-details-user-details-address">
                                Address: {user.address}, {user.city}{' '}
                                {user.state} {user.country}
                            </p>
                            <p className="important-details-user-details-p-link">
                                more ads by
                                <Link
                                    className="important-details-user-details-p-link-link"
                                    to=""
                                >
                                    {' '}
                                    This Seller
                                </Link>
                            </p>
                        </div>

                        <div className="important-details-safety-tips">
                            <h6 className="important-details-safety-tips-h6">
                                Safety tips for transaction
                            </h6>
                            <ol>
                                <li className="important-details-safety-tips-p-1">
                                    Use a safe location to meet seller
                                </li>
                                <li className="important-details-safety-tips-p-2">
                                    Avoid cash transactions
                                </li>
                                <li className="important-details-safety-tips-p-3">
                                    Beware of unrealistic offers
                                </li>
                            </ol>
                        </div>

                        <div className="important-details-buttons">
                            <p
                                className="important-details-buttons-report"
                                onClick={async () => {
                                    try {
                                        await Axios.put(
                                            `${keys.BACKEND}/api/ads/mark-sold/${data.id}`
                                        );
                                        setReported(true);
                                    } catch (error) {
                                        alert(
                                            'Something went wrong during Marking!'
                                        );
                                    }
                                }}
                            >
                                {!reported ? 'Report This Ad' : 'Reported'}
                            </p>

                            {data.userId &&
                            props.currentUser &&
                            data.userId === props.currentUser.id ? (
                                <p
                                    className="important-details-buttons-report"
                                    onClick={async () => {
                                        try {
                                            await Axios.put(
                                                `${keys.BACKEND}/api/ads/mark-sold/${data.id}`
                                            );
                                            setSold(true);
                                        } catch (error) {
                                            alert(
                                                'Something went wrong during Marking!'
                                            );
                                        }
                                    }}
                                >
                                    {!sold ? 'Mark as Sold' : 'Marked Sold'}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    {/* HIDDEN MIXIN DATA */}

                    <div className="carousel-x-table">
                        <DenseTable2 data={data} />
                    </div>

                    <div className="carousel-x-description">
                        <h5 className="carousel-x-description-h5">
                            Description By Seller
                        </h5>
                        <p className="carousel-x-description-p">
                            {data.description}
                        </p>
                    </div>

                    {data.userId &&
                    props.currentUser &&
                    data.userId !== props.currentUser.id ? (
                        <br />
                    ) : null}

                    <div className="ad-details-buttons">
                        {data.userId &&
                        props.currentUser &&
                        data.userId === props.currentUser.id ? (
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={`/update-ad-details-${btoa(
                                    data && data.id
                                )}-details-x`}
                            >
                                <p className="ad-details-buttons-update">
                                    Update Ad
                                </p>
                            </Link>
                        ) : null}

                        {data.userId &&
                        props.currentUser &&
                        data.userId === props.currentUser.id ? (
                            <p
                                className=" ad-details-buttons-delete"
                                onClick={async () => {
                                    try {
                                        await Axios.delete(
                                            `${
                                                keys.BACKEND
                                            }/api/ads/delete-ad/${
                                                data && data.id
                                            }`
                                        );
                                        window.location = '/get-my-ads';
                                    } catch (error) {
                                        alert(
                                            'Some error occured while deleting ad'
                                        );
                                    }
                                }}
                            >
                                Delete Ad
                            </p>
                        ) : null}
                    </div>

                    <br />
                </div>

                <div className="important-details">
                    <div className="important-details-pricing">
                        <div className="important-details-pricing-price">
                            PKR {data.price}
                        </div>
                        <div className="important-details-pricing-phone-number">
                            <i class="fa-solid fa-phone important-details-pricing-phone-number-icon-style"></i>{' '}
                            {user.phoneNumber}
                        </div>
                        <div className="important-details-pricing-mail">
                            <i class="fa-solid fa-envelope important-details-pricing-mail-icon-style"></i>{' '}
                            <span className="important-details-pricing-mail-span">
                                {user.email}
                            </span>
                        </div>
                    </div>

                    <div className="important-details-user-details">
                        <h4 className="important-details-user-details-h4">
                            Seller Information
                        </h4>
                        {user && user.imageUrl ? (
                            <img
                                className="important-details-user-details-img"
                                src={user && user.imageUrl}
                                alt=""
                            />
                        ) : (
                            <img
                                className="important-details-user-details-img"
                                src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                alt=""
                            />
                        )}
                        <p className="important-details-user-details-p">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="important-details-user-details-address">
                            Address: {user.address}, {user.city} {user.state}{' '}
                            {user.country}
                        </p>
                        <p className="important-details-user-details-p-link">
                            more ads by
                            <Link
                                className="important-details-user-details-p-link-link"
                                to=""
                            >
                                {' '}
                                This Seller
                            </Link>
                        </p>
                    </div>

                    <div className="important-details-safety-tips">
                        <h6 className="important-details-safety-tips-h6">
                            Safety tips for transaction
                        </h6>
                        <ol>
                            <li className="important-details-safety-tips-p-1">
                                Use a safe location to meet seller
                            </li>
                            <li className="important-details-safety-tips-p-2">
                                Avoid cash transactions
                            </li>
                            <li className="important-details-safety-tips-p-3">
                                Beware of unrealistic offers
                            </li>
                        </ol>
                    </div>

                    <div className="important-details-buttons">
                        <p
                            className="important-details-buttons-report"
                            onClick={async () => {
                                try {
                                    await Axios.put(
                                        `${keys.BACKEND}/api/ads/mark-sold/${data.id}`
                                    );
                                    setReported(true);
                                } catch (error) {
                                    alert(
                                        'Something went wrong during Marking!'
                                    );
                                }
                            }}
                        >
                            {!reported ? 'Report This Ad' : 'Reported'}
                        </p>

                        {data.userId &&
                        props.currentUser &&
                        data.userId === props.currentUser.id ? (
                            <p
                                className="important-details-buttons-report"
                                onClick={async () => {
                                    try {
                                        await Axios.put(
                                            `${keys.BACKEND}/api/ads/mark-sold/${data.id}`
                                        );
                                        setSold(true);
                                    } catch (error) {
                                        alert(
                                            'Something went wrong during Marking!'
                                        );
                                    }
                                }}
                            >
                                {!sold ? 'Mark as Sold' : 'Marked Sold'}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default {
    component: connect(mapStateToProps)(AdDetails)
};

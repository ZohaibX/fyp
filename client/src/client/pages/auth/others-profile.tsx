import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { fetchCurrentUser } from '../../Store/actions/index';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import InputGroup from 'react-bootstrap/InputGroup';
import { Helmet } from 'react-helmet';
import PopUp from '../../components/modal';
import PopUpPassword from '../../components/modal2';
import Axios from 'axios';
import MultipleSelectCheckmarks from '../../components/multi-select';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const OthersProfile = (props) => {
    const [error, setError] = React.useState('');
    const [passwordChanged, setPasswordChanged] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [show, setShow] = React.useState(false);

    const [specieName, setSpecieName] = React.useState<string[]>([]);
    const [file, setFile] = React.useState(null);
    const [userImageUrl, setUserImageUrl] = React.useState('');

    const userId = atob(props.match.params.userId);

    React.useEffect(() => {
        props.fetchCurrentUser();

        const fetchUserData = async () => {
            const { data } = await Axios.get(
                `http://localhost/api/users/get-user-details/${userId}`
            );
            setAddress(data.address);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMobile(data.phoneNumber);
            setCity(data.city);
            setEmail(data.email);
            setSpecieName(data.interests);
            setUserImageUrl(data.imageUrl);
            return setUser(data);
        };
        fetchUserData();
    }, []);

    const head = () => (
        <Helmet>
            <title>{`${user && user.firstName ? user.firstName : 'Profile'} ${
                user && user.LastName ? user.LastName : ''
            }`}</title>
            {/* // this is how we will make our title dynamic */}
            <meta property="og:title" content="Admins List"></meta>
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    const saveChanges = async (topic, value) => {
        if (topic === 'firstName') {
            try {
                await Axios.put(
                    ` http://localhost/api/users/edit-user-firstName`,
                    {
                        firstName: value
                    }
                );
                // window.location = `/user-${props.match.params.id}-profile`;
                setFirstName(value);
                setShow(false);
            } catch (error) {
                setError('There went something wrong!');
                return error;
            }
        }
        if (topic === 'lastName') {
            try {
                await Axios.put(
                    ` http://localhost/api/users/edit-user-lastName`,
                    {
                        lastName: value
                    }
                );
                setLastName(value);
                // window.location = `/user-${props.match.params.id}-profile`;
            } catch (error) {
                setError('There went something wrong!');
            }
        }
        if (topic === 'mobile') {
            try {
                await Axios.put(
                    ` http://localhost/api/users/edit-user-mobile`,
                    {
                        mobile: value
                    }
                );
                setMobile(value);
                // window.location = `/user-${props.match.params.id}-profile`;
            } catch (error) {
                setError('There went something wrong!');
            }
        }
        if (topic === 'city') {
            try {
                await Axios.put(` http://localhost/api/users/edit-user-city`, {
                    city: value
                });
                setCity(value);
                // window.location = `/user-${props.match.params.id}-profile`;
            } catch (error) {
                setError('There went something wrong!');
            }
        }
        if (topic === 'address') {
            try {
                await Axios.put(
                    ` http://localhost/api/users/edit-user-address`,
                    {
                        address: value
                    }
                );
                // window.location = `/user-${props.match.params.id}-profile`;
                setAddress(value);
            } catch (error) {
                setError('There went something wrong!');
            }
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            await Axios.put(` http://localhost/api/users/edit-user-password`, {
                currentPassword,
                newPassword
            });
            setPasswordChanged(true);
            window.location.reload();
            // window.location = `/user-${props.match.params.id}-profile`;
        } catch (e) {
            if (e.response.data.errors[0])
                setError(e.response.data.errors[0].message.toUpperCase());
            else setError(e.response.data.message);
        }
    };

    if (props.currentUser && props.currentUser.length) {
        setCurrentUser(props.currentUser.id);
    }

    const handleChange = async (fileX) => {
        setFile(fileX);

        const { data: url } = await Axios.get(
            `${keys.BACKEND}/api/ads/ad-upload/get-url/`
        );
        if (!url) return setError('Url was not retrieved successfully');

        // put image in url
        await Axios.put(url.url, fileX[0], {
            headers: { 'Content-Type': fileX[0].type }
        });

        let response;
        try {
            response = await Axios.put(
                `${keys.BACKEND}/api/users/edit-user-profile-pic`,
                {
                    imageUrl: url
                }
            );
            window.location.reload();
        } catch (error) {
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    return (
        <div>
            {head()}

            {user && !user.phoneNumber ? (
                <div
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        marginTop: '20px',
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        color: 'black',
                        fontFamily: 'cursive'
                    }}
                    className="alert alert-primary"
                >
                    All of the details must be filled to proceed
                </div>
            ) : (
                ''
            )}

            {user && user.phoneNumber && !user.city ? (
                <div
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        marginTop: '20px',
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        color: 'black',
                        fontFamily: 'cursive'
                    }}
                    className="alert alert-primary"
                >
                    All of the details must be filled to proceed
                </div>
            ) : (
                ''
            )}

            {user && user.phoneNumber && user.city && !user.address ? (
                <div
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        marginTop: '20px',
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        color: 'black',
                        fontFamily: 'cursive'
                    }}
                    className="alert alert-primary"
                >
                    All of the details must be filled to proceed
                </div>
            ) : (
                ''
            )}

            <div
                className="container mt-5"
                style={{ background: '#F8F8FF', height: '100vh' }}
            >
                <div className="avatar mt-5">
                    {!userImageUrl && (
                        <div className="profile-image-box">
                            <img
                                src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                className="profile-image"
                            />

                            {user &&
                            props.currentUser &&
                            user.id === props.currentUser.id ? (
                                <div className="edit-profile-pic font-weight-bold">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                    >
                                        <input
                                            onChange={(e) =>
                                                handleChange(e.target.files)
                                            }
                                            hidden
                                            accept="image/*"
                                            type="file"
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {userImageUrl && (
                        <div className="profile-image-box">
                            <img src={userImageUrl} className="profile-image" />

                            {user &&
                            props.currentUser &&
                            user.id === props.currentUser.id ? (
                                <div className="edit-profile-pic font-weight-bold">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                    >
                                        <input
                                            onChange={(e) =>
                                                handleChange(e.target.files)
                                            }
                                            hidden
                                            accept="image/*"
                                            type="file"
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="details">
                    <div className="interests-select details-1">
                        <MultipleSelectCheckmarks
                            specieName={specieName}
                            setSpecieName={setSpecieName}
                            sameUser={
                                user &&
                                props.currentUser &&
                                user.id === props.currentUser.id
                            }
                        />
                    </div>

                    <div className="firstName details-1">
                        {/* {firstName} */}
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                First Name
                            </InputGroup.Text>
                            <Form.Control
                                value={firstName}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        {user &&
                        props.currentUser &&
                        user.id === props.currentUser.id ? (
                            <PopUp
                                name={'Edit'}
                                error={error}
                                topic="firstName"
                                title={'Edit Your First Name'}
                                placeHolder="Please Write Here..."
                                saveChanges={saveChanges}
                            />
                        ) : null}
                    </div>

                    <div className="lastName details-1">
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                Last Name
                            </InputGroup.Text>
                            <Form.Control
                                value={lastName}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        {user &&
                        props.currentUser &&
                        user.id === props.currentUser.id ? (
                            <PopUp
                                error={error}
                                name={'Edit'}
                                topic="lastName"
                                title={'Edit Your Last Name'}
                                placeHolder="Please Write Here..."
                                saveChanges={saveChanges}
                            />
                        ) : null}
                    </div>

                    <div className="email details-1">
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                Email
                            </InputGroup.Text>
                            <Form.Control
                                value={email}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </div>

                    <div className="phone details-1">
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                Mobile Number
                            </InputGroup.Text>
                            <Form.Control
                                value={mobile}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>

                        {user &&
                        props.currentUser &&
                        user.id === props.currentUser.id ? (
                            <PopUp
                                error={error}
                                name={'Edit'}
                                topic="mobile"
                                title={'Edit Your Phone Number'}
                                placeHolder="Please Write Here..."
                                saveChanges={saveChanges}
                            />
                        ) : null}
                    </div>

                    <div className="details-1">
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                City
                            </InputGroup.Text>
                            <Form.Control
                                value={city}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>

                        {user &&
                        props.currentUser &&
                        user.id === props.currentUser.id ? (
                            <PopUp
                                error={error}
                                name={'Edit'}
                                topic="city"
                                title={'Edit Your City Name'}
                                placeHolder="Please Write Here..."
                                saveChanges={saveChanges}
                            />
                        ) : null}
                    </div>

                    <div className="address details-1">
                        <InputGroup className="mb-3" style={{ width: '80%' }}>
                            <InputGroup.Text
                                style={{ width: '150px' }}
                                id="inputGroup-sizing-default"
                            >
                                Address
                            </InputGroup.Text>
                            <Form.Control
                                value={address}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>

                        {user &&
                        props.currentUser &&
                        user.id === props.currentUser.id ? (
                            <PopUp
                                error={error}
                                name={'Edit'}
                                topic="address"
                                title={'Edit Your Address'}
                                placeHolder="Please Write Here..."
                                saveChanges={saveChanges}
                            />
                        ) : null}
                    </div>

                    <div className="error-alert">
                        {error && (
                            <Alert severity="error">
                                This is an error — {error}
                            </Alert>
                        )}
                        <br />
                    </div>

                    {user &&
                    props.currentUser &&
                    user.id === props.currentUser.id ? (
                        <div
                            className="btn bg-x save-btn"
                            onClick={async () => {
                                if (specieName.length < 5) {
                                    setError(
                                        'Please Select at least five of the birds as your interest'
                                    );
                                } else {
                                    setError('');
                                    await Axios.put(
                                        `${keys.BACKEND}/api/users/edit-user-interests`,
                                        {
                                            interests: specieName
                                        }
                                    );
                                }
                            }}
                        >
                            Save
                        </div>
                    ) : null}

                    {user &&
                    !user.socialAccount &&
                    props.currentUser &&
                    user.id === props.currentUser.id ? (
                        <div
                            className="password-details details-1"
                            id="password-details"
                            // style={{ marginBottom: '20px' }}
                        >
                            <PopUpPassword
                                error={error}
                                saveChanges={changePassword}
                                currentUser={props.currentUser}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

import { dividerClasses } from '@mui/material';
import RequireAuth from '../../components/hocs/require-auth';
import { keys } from '../../../config/keys';
export default {
    component: RequireAuth(
        connect(mapStateToProps, { fetchCurrentUser })(OthersProfile)
    )
    // component: connect(mapStateToProps, { fetchCurrentUser })(OthersProfile),
};

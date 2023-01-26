import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { fetchCurrentUser } from '../../Store/actions/index';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import InputGroup from 'react-bootstrap/InputGroup';
import PopUp from '../../components/modal';
import PopUpPassword from '../../components/modal2';
import Axios from 'axios';
import MultipleSelectCheckmarks from '../../components/multi-select';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Country, State, City } from 'country-state-city';
import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';

const Profile = (props) => {
    const [error, setError] = React.useState('');
    const [passwordChanged, setPasswordChanged] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [mobile, setMobile] = React.useState(+92);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [about, setAbout] = React.useState('');
    const [date, setDate] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [citiesList, setCitiesList] = React.useState([]);

    const [specieName, setSpecieName] = React.useState<string[]>([]);
    const [file, setFile] = React.useState(null);
    const [userImageUrl, setUserImageUrl] = React.useState('');

    const userId = atob(props.match.params.userId);
    const originalUser = atob(props.match.params.test);
    console.log('ORIGINAL USER: ', originalUser);

    React.useEffect(() => {
        props.fetchCurrentUser();

        const fetchUserData = async () => {
            const { data } = await Axios.get(
                `http://localhost/api/users/get-user-details/${userId}`
            );
            setAddress(data.address);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMobile(
                data.phoneNumber.length
                    ? parseInt(data.phoneNumber)
                    : parseInt('+92')
            );
            setCity(data.city);
            setDate(data.date);
            setMonth(data.month);
            setYear(data.year);
            setGender(data.gender);
            setAbout(data.about);
            setEmail(data.email);
            setSpecieName(data.interests.length ? data.interests : []);
            setUserImageUrl(data.imageUrl);
            setState(data.state);
            setCountry(data.country);
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

    const generateYears = (startYear) => {
        var currentYear = new Date().getFullYear(),
            years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    };

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

    console.log('USER: ', user);
    console.log('ABOUT: ', about);

    return (
        <div className="profile-page">
            {head()}

            <div className="profile">
                {originalUser === 'true' ? (
                    <h3 className="profile-h3">Edit profile</h3>
                ) : (
                    <h3 className="profile-h3">Profile</h3>
                )}

                <div className="profile-picture">
                    <h5 className="profile-picture-h5">Profile Photo</h5>
                    <div className="profile-picture-image-box">
                        <div className="profile-picture-image-box-div">
                            <img
                                className="profile-picture-image-box-div-img"
                                src={
                                    userImageUrl && userImageUrl.length
                                        ? userImageUrl
                                        : 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
                                }
                                alt=""
                            />
                        </div>
                        {originalUser === 'true' && (
                            <div className="profile-picture-image-box-upload">
                                {/* <p className="profile-picture-image-box-upload-button">Upload Photo</p> */}
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    className="profile-picture-image-box-upload-button"
                                    style={{
                                        fontSize: '1rem',
                                        marginBottom: '.8rem'
                                    }}
                                >
                                    <input
                                        onChange={(e) =>
                                            handleChange(e.target.files)
                                        }
                                        hidden
                                        accept="image/*"
                                        type="file"
                                    />
                                    Upload Photo
                                </IconButton>
                                <p className="profile-picture-image-box-upload-button-p">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation profile-picture-image-box-upload-button-p-icon"></i>{' '}
                                    <span className="profile-picture-image-box-upload-button-p-span">
                                        JPG, JPEG, PNG images allowed
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="basic-info">
                <div className="basic-info-h5">Basic Information</div>

                <div className="basic-info-box">
                    <div className="basic-info-box-left">
                        <div className="basic-info-box-left-name">
                            <TextField
                                className="basic-info-box-left-text"
                                id="standard-basic"
                                value={firstName}
                                disabled={originalUser === 'false' && true}
                                onChange={(e) =>
                                    setFirstName(e.currentTarget.value)
                                }
                                label="First Name"
                                variant="standard"
                            />
                            <TextField
                                className="basic-info-box-left-text"
                                id="standard-basic"
                                value={lastName}
                                disabled={originalUser === 'false' && true}
                                onChange={(e) =>
                                    setLastName(e.currentTarget.value)
                                }
                                label="Last Name"
                                variant="standard"
                            />
                        </div>

                        <div className="basic-info-box-left-dob">
                            <h6 className="basic-info-box-left-dob-h6">
                                Date of birth
                            </h6>
                            <div className="basic-info-box-left-dob-date">
                                <BasicSelectDOB
                                    value={date}
                                    disabled={originalUser === 'false' && true}
                                    setValue={setDate}
                                    title="Date"
                                    data={[
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                        13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                                        23, 24, 25, 26, 27, 28, 29, 30, 31
                                    ]}
                                />
                                <BasicSelectDOB
                                    value={month}
                                    disabled={originalUser === 'false' && true}
                                    setValue={setMonth}
                                    title="Month"
                                    data={[
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
                                    ]}
                                />
                                <BasicSelectDOB
                                    value={year}
                                    disabled={originalUser === 'false' && true}
                                    setValue={setYear}
                                    title="Year"
                                    data={generateYears(1970)}
                                />
                            </div>
                        </div>

                        <div className="basic-info-box-left-gender">
                            <h6 className="basic-info-box-left-dob-h6">
                                Gender
                            </h6>
                            <BasicSelectDOB
                                disabled={originalUser === 'false' && true}
                                value={gender}
                                setValue={setGender}
                                title=""
                                data={['Male', 'Female', 'Prefer not to say']}
                            />
                        </div>

                        <div className="basic-info-box-left-about">
                            {originalUser === 'true' ? (
                                <h6 className="basic-info-box-left-dob-h6">
                                    About Yourself (optional)
                                </h6>
                            ) : (
                                <h6 className="basic-info-box-left-dob-h6">
                                    About {firstName}
                                </h6>
                            )}
                            <TextField
                                className="basic-info-box-left-about-text"
                                id="outlined-multiline-static"
                                // label="Multiline"
                                disabled={originalUser === 'false' && true}
                                multiline
                                rows={6}
                                value={about}
                                onChange={(e) => {
                                    setAbout(e.currentTarget.value);
                                }}
                                // defaultValue="About me (optional)"
                            />
                            {about && about.length > 200 && (
                                <p className="basic-info-box-left-about-p profile-picture-image-box-upload-button-p">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation profile-picture-image-box-upload-button-p-icon"></i>{' '}
                                    <span className="profile-picture-image-box-upload-button-p-span">
                                        Characters limit is 200 -- Fix this
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="basic-info-box-right">
                        <h5 className="basic-info-box-right-h5">
                            {/* <i class="fa-duotone fa-thought-bubble"></i>              */}
                            <span className="basic-info-box-right-h5-span">
                                Why it is important?
                            </span>
                        </h5>
                        <p className="basic-info-box-right-p">
                            Trade the bird is built on trust. Help other people
                            get to know you. Tell them about the things you
                            know. Share your introduction, your pets details (if
                            you own any). And you will see the results…
                        </p>
                    </div>
                </div>
            </div>

            <div className="contact-info">
                <div className="basic-info-h5 contact-info-h5">
                    Contact Details
                </div>

                <div className="contact-info-address-box">
                    <div className="contact-info-address-box-selects ">
                        <BasicSelectCity
                            disabled={originalUser === 'false' && true}
                            value={city}
                            setValue={setCity}
                            address="yes"
                        />
                        <BasicSelectDOB
                            disabled={originalUser === 'false' && true}
                            value={state}
                            setValue={setState}
                            address="yes"
                            title="State"
                            data={[
                                'Punjab',
                                'Sindh',
                                'Balochistan',
                                'KPK',
                                'Gilgit',
                                'AJK'
                            ]}
                        />
                        <BasicSelectDOB
                            disabled={originalUser === 'false' && true}
                            value={country}
                            setValue={setCountry}
                            address="yes"
                            title="Country"
                            data={['Pakistan']}
                        />
                    </div>
                    <p className="contact-info-address-box-selects-p basic-info-box-left-about-p profile-picture-image-box-upload-button-p do-it">
                        <i className="fa-sharp fa-solid fa-circle-exclamation profile-picture-image-box-upload-button-p-icon"></i>{' '}
                        <span className="profile-picture-image-box-upload-button-p-span ">
                            We are available only in Pakistan for now.
                        </span>
                    </p>
                </div>

                <div className="contact-info-phone-number">
                    <TextField
                        disabled={originalUser === 'false' && true}
                        value={address}
                        onChange={(e) => setAddress(e.currentTarget.value)}
                        className="basic-info-box-left-text contact-info-phone-number-text"
                        id="standard-basic"
                        label="Address"
                        variant="standard"
                    />
                </div>

                <div className="contact-info-phone-number">
                    <TextField
                        disabled={originalUser === 'false' && true}
                        type="number"
                        value={mobile}
                        onChange={(e) => setMobile(e.currentTarget.value)}
                        className="basic-info-box-left-text contact-info-phone-number-text"
                        id="standard-basic"
                        label="Phone No."
                        variant="standard"
                    />
                    <TextField
                        disabled={true}
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        className="basic-info-box-left-text contact-info-phone-number-text"
                        id="standard-basic"
                        label="Email"
                        variant="standard"
                    />
                </div>
            </div>

            <div
                style={{
                    fontSize: '0.4rem',
                    borderBottom: '.5px solid #778899',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem'
                }}
                className="interests-select"
            >
                <h5 style={{ fontSize: '1.1rem' }}>
                    Select Your Interests (optional)
                </h5>
                <MultipleSelectCheckmarks
                    specieName={specieName}
                    ms="yes"
                    disabled={originalUser === 'false' && true}
                    setSpecieName={setSpecieName}
                    sameUser={
                        user &&
                        props.currentUser &&
                        user.id === props.currentUser.id
                    }
                />
            </div>

            {error && error.length && (
                <Alert
                    className="error-message"
                    style={{
                        maxWidth: '30%',
                        margin: '0 auto',
                        marginBottom: '2rem'
                    }}
                    severity="error"
                >
                    {error}
                </Alert>
            )}

            {originalUser === 'true' && (
                <p
                    onClick={async () => {
                        if (
                            !date ||
                            !month ||
                            !year ||
                            !gender ||
                            !city ||
                            !state ||
                            !country ||
                            !address ||
                            !mobile
                        )
                            return setError(
                                'All the required fields must be filled to proceed.'
                            );
                        try {
                            await Axios.put(
                                `${keys.BACKEND}/api/user/edit-user-details`,
                                {
                                    date,
                                    month,
                                    year,
                                    gender,
                                    about,
                                    species: specieName,
                                    city,
                                    state,
                                    country,
                                    address,
                                    phoneNumber: mobile
                                }
                            );
                            window.location.reload();
                        } catch (error) {
                            return alert(error.response.data.errors[0].message);
                        }
                    }}
                    className="save-changes profile-picture-image-box-upload-button"
                >
                    Save Changes
                </p>
            )}
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

import { dividerClasses } from '@mui/material';
import RequireAuth from '../../components/hocs/require-auth';
import { keys } from '../../../config/keys';
import PopUp3 from '../../components/home/modal-3';
import PopUp4 from '../../components/home/modal-4';
import PopUpX from '../../components/home/modal-x';
import BasicSelectDOB from '../../components/select-dob';
import BasicSelectCity from '../../components/select-city';
export default {
    // component: RequireAuth(
    //   connect(mapStateToProps, { fetchCurrentUser })(Profile)
    // ),
    component: connect(mapStateToProps, { fetchCurrentUser })(Profile)
};

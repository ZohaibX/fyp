import * as React from 'react';
import { Form } from 'react-bootstrap';
import Select from '../../components/form/Auto-Complete';
import NormalSelect from '../../components/form/Auto-Complete-Normal';
import BirdNameSelect from '../../components/form/bird-name-autocomplete';
import Text from '../../components/form/text-field';
import { TextField } from '@mui/material';
import UploadButton from '../../components/form/file-picker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Alert from '@mui/material/Alert';
import { keys } from '../../../config/keys';
import RequireAuth from '../../components/hocs/require-auth';
import { Helmet } from 'react-helmet';
import SearchSpecies from '../../components/home/search-species';
import GenderSelect from '../../components/home/select';
import imageCompression from 'browser-image-compression';

function PostAd() {
    const [breedName, setBreedName] = React.useState('');
    const [birdName, setBirdName] = React.useState('');
    const [adTitle, setAdTitle] = React.useState('');
    const [adDescription, setAdDescription] = React.useState('');
    const [adPrice, setAdPrice] = React.useState('');
    const [adId, setAdId] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [locationDetails, setLocationDetails] = React.useState('');
    const [city, setCity] = React.useState('');
    const [age, setAge] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [specie, setSpecie] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState('');
    const [error1, setError1] = React.useState('');
    const [favouriteFood, setFavouriteFood] = React.useState('');
    const [sent, setSent] = React.useState(false);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await axios.get(
                `${keys.BACKEND}/api/users/currentUserData`
            );

            setLocationDetails(data.data.address);
            setCity(data.data.city);
            setContact(data.data.phoneNumber);
        };
        fetchUserData();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setSent(true);

        if (adTitle.length > 30) {
            setSent(false);
            return setError('Please Keep Title Short & Simple');
        }
        if (
            !files.length ||
            !specie ||
            !adTitle ||
            !adDescription ||
            !adPrice ||
            !age ||
            !gender
        ) {
            setSent(false);
            return setError('fill all the requirements');
        }
        if (files.length > 5) {
            setSent(false);
            return setError('At most 5 images could be selected');
        }

        if (adTitle.length > 30) {
            setSent(false);
            return setError('Title must be simple and short');
        }

        // get url from this route - when all the app is single
        let urls = [];
        for (let i = 0; i < files.length; i++) {
            const { data } = await axios.get(
                `${keys.BACKEND}/api/ads/ad-upload/get-url/`
            );
            urls = [...urls, data];
        }

        // now update picture in that url
        for (let i = 0; i < files.length; i++) {
            const compressedFile = await imageCompression(files[i], {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            });
            const newFile = new File([compressedFile], compressedFile.name);
            const response = await axios.put(urls[i].url, newFile, {
                headers: { 'Content-Type': newFile.type }
            });
        }

        // here, update the picture url in user's data
        let response;

        try {
            response = await axios.post(`${keys.BACKEND}/api/ads/ad-upload/`, {
                images: urls,
                birdName: birdName,
                specieName: specie,
                age,
                gender,
                adTitle,
                adDescription,
                adPrice,
                contact,
                locationDetails,
                city,
                favouriteFood
            });
            window.location = '/';
        } catch (error) {
            setSent(false);
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    //! This function is for SEO
    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`Post AD`}</title>
        </Helmet>
    );

    const ageValues = [
        '1-5 Months',
        '6-10 Months',
        '11-15 Months',
        '16-20 Months',
        '21-25 Months',
        '26-30 Months',
        '31-35 Months',
        '36-40 Months',
        'More Than 40 Months'
    ];

    return (
        <div
            className=""
            style={{ width: '100%', minHeight: '75vh', margin: '0 auto' }}
        >
            {head()}
            <h2
                className="text-center my-5"
                style={{
                    fontFamily: 'Alfa Slab One',
                    borderBottom: '2px solid black',
                    paddingBottom: '2px',
                    width: '400px',
                    margin: '0 auto'
                }}
            >
                Upload Bird Ad.
            </h2>

            <Form onSubmit={submit} className="form-post">
                <div className="" id="search-box-post species-select mb-2">
                    <FreeSoloBird value={birdName} setValue={setBirdName} />
                </div>
                <br />

                <div className="" id="search-box-post species-select">
                    <SearchSpecies value={specie} setValue={setSpecie} />
                </div>

                <div className="ad-title mb-2">
                    <Text
                        label="Give Your Ad - A Title ... "
                        value={adTitle}
                        setValue={setAdTitle}
                        updateCurrentPage={() => {
                            return null;
                        }}
                        setPageX={() => {
                            return null;
                        }}
                    />
                    <Form.Text
                        className="text-muted"
                        style={{ marginLeft: '10px' }}
                    >
                        It must be simple and short -- comprising not more than
                        30 characters
                    </Form.Text>
                </div>
                <br />

                <div className="ad-desc mb-2" style={{ marginTop: '-20px' }}>
                    <Text
                        label="Description ..."
                        value={adDescription}
                        setValue={setAdDescription}
                        updateCurrentPage={() => {
                            return null;
                        }}
                        setPageX={() => {
                            return null;
                        }}
                    />
                </div>

                <div className="post-flex-1" style={{ marginTop: '20px' }}>
                    <div className="price mb-3" style={{ marginTop: '-20px' }}>
                        <Text
                            label="Price (PKR) ..."
                            value={adPrice}
                            setValue={setAdPrice}
                            type="Number"
                            updateCurrentPage={() => {
                                return null;
                            }}
                            setPageX={() => {
                                return null;
                            }}
                        />{' '}
                    </div>

                    <div className="upload">
                        <UploadButton files={files} setFiles={setFiles} />
                        <br />
                        {!files.length ? (
                            <Form.Text className="text-muted">
                                Please select the only images - which are
                                clearly recognizable.
                            </Form.Text>
                        ) : (
                            <Form.Text className="text-muted">
                                {files.length}{' '}
                                {files.length > 1 ? 'Images' : 'Image'}{' '}
                                {files.length > 1 ? 'are' : 'is'} selected --
                                Click the button again to Reselect
                            </Form.Text>
                        )}
                    </div>
                </div>

                <br />

                <div className="location-box-post" id="location-box-post">
                    <div className="gender">
                        <GenderSelect
                            title={'Gender'}
                            values={['Male', 'Female', 'Not Sure']}
                            value={gender}
                            setValue={setGender}
                        />
                    </div>

                    <div className="age age-select">
                        <GenderSelect
                            title={'Age'}
                            values={ageValues}
                            value={age}
                            setValue={setAge}
                        />
                    </div>

                    <div className="age age-select">
                        <Text
                            label="Favourite Food (Optional)"
                            value={favouriteFood}
                            setValue={setFavouriteFood}
                            updateCurrentPage={() => {
                                return null;
                            }}
                            setPageX={() => {
                                return null;
                            }}
                        />
                    </div>
                </div>

                <div className="error-alert">
                    {error && (
                        <Alert severity="error">
                            This is an error — {error}
                        </Alert>
                    )}
                    <br />
                </div>

                <div className="d-grid gap-2 ">
                    <Button
                        type="submit"
                        className="bg-x"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            height: '50px',
                            fontWeight: 'bold'
                        }}
                        variant="contained"
                        endIcon={!sent && <SendIcon />}
                    >
                        {!sent ? 'SEND' : 'SENDING ...'}
                    </Button>
                </div>
            </Form>

            <div className="" style={{ height: '20px' }}></div>
        </div>
    );
}

import ForBlocked from '../../components/hocs/for-blocked';
import RequireProfileCompletion from '../../components/hocs/complete-profile';
import FreeSoloBird from '../../components/home/search-bird';
export default {
    // component: PostAd,
    component: RequireProfileCompletion(ForBlocked(RequireAuth(PostAd)))
};

import * as React from 'react';
import { Form } from 'react-bootstrap';
import Select from '../../components/form/Auto-Complete';
import NormalSelect from '../../components/form/Auto-Complete-Normal';
import BirdNameSelect from '../../components/form/bird-name-autocomplete';
import Text from '../../components/form/text-field';
import UploadButton from '../../components/form/file-picker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Alert from '@mui/material/Alert';
import { keys } from '../../../config/keys';
import Axios from 'axios';
import SearchSpecies from '../../components/home/search-species';
import FreeSoloBird from '../../components/home/search-bird';
import GenderSelect from '../../components/home/select';
import { Helmet } from 'react-helmet';

function UpdateAd(props) {
    const [birdName, setBirdName] = React.useState('');
    const [adTitle, setAdTitle] = React.useState('');
    const [adDescription, setAdDescription] = React.useState('');
    const [adPrice, setAdPrice] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [locationDetails, setLocationDetails] = React.useState('');
    const [city, setCity] = React.useState('');
    const [error, setError] = React.useState('');
    const [specie, setSpecie] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [age, setAge] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [favouriteFood, setFavouriteFood] = React.useState('');
    const [data, setData] = React.useState([]);

    const id = atob(props.match.params.id);

    React.useEffect(() => {
        const fetchAdDetails = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-ad/${id}`
            );
            setBirdName(data.birdName);
            setSpecie(data.specieName);
            setAdTitle(data.title);
            setAdDescription(data.description);
            setAdPrice(data.price);
            setContact(data.contactNumber);
            setLocationDetails(data.locationDetails);
            setCity(data.city);
            setUserId(data.userId);

            if (data && data.gender === 'female') setGender('Female');
            else if (data && data.gender === 'male') setGender('Male');
            else setGender('Not Sure');

            setAge(data.age);
            setFavouriteFood(data.favouriteFood);
            setData(data);
        };
        fetchAdDetails();
    }, []);

    console.log('DATAl: ', data);

    const submit = async (e) => {
        e.preventDefault();
        if (
            !adTitle ||
            !adDescription ||
            !adPrice ||
            !contact ||
            !locationDetails ||
            !city ||
            !age ||
            !gender ||
            !favouriteFood ||
            !birdName
        )
            return alert('fill all the requirements');

        // here, update the picture url in user's data
        let response;

        try {
            await axios.put(`${keys.BACKEND}/api/ads/update-ad/${id}`, {
                birdName,
                specieName: specie,
                adTitle,
                adDescription,
                adPrice,
                age,
                gender,
                favouriteFood
            });
            window.location = `/ad-details-${btoa(id)}-${btoa(
                userId
            )}-details-x`;
        } catch (error) {
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`Update`}</title>
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
        <div className="" style={{ width: '100%', margin: '0 auto' }}>
            {head()}
            <h2
                className="text-center my-5"
                style={{ fontFamily: 'Alfa Slab One' }}
            >
                Update The AD.
            </h2>

            <Form className="form-update" onSubmit={submit}>
                <div className="" id="search-box-post species-select mb-2">
                    <FreeSoloBird value={birdName} setValue={setBirdName} />
                </div>
                <br />

                <div className="" id="search-box-post species-select">
                    <SearchSpecies value={specie} setValue={setSpecie} />
                </div>

                <br />
                <div className="ad-title mb-2">
                    <Text
                        label="Give Your Ad - A Promising Title ... "
                        value={adTitle}
                        setValue={setAdTitle}
                    />
                </div>
                <br />

                <div className="ad-desc mb-2" style={{ marginTop: '-20px' }}>
                    <Text
                        label="Description ..."
                        value={adDescription}
                        setValue={setAdDescription}
                    />
                </div>

                <div className="post-flex-1" style={{ marginTop: '20px' }}>
                    <div className="price" style={{ marginTop: '-20px' }}>
                        <Text
                            label="Price (PKR) ..."
                            value={adPrice}
                            setValue={setAdPrice}
                            type="Number"
                        />{' '}
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

                <div className="d-grid gap-2">
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
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </div>
            </Form>

            <br />
        </div>
    );
}

export default {
    component: UpdateAd
};

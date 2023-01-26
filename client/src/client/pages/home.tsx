import * as React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Passport from '../components/passport/auth';
import Axios from 'axios';
import useRequest from '../hooks/use-request';
import MediaCard from '../components/home/card';
import BirdNameSelect from '../components/form/bird-name-autocomplete';
import Select from '../components/form/Auto-Complete';
import ForBlocked from '../components/hocs/for-blocked';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RightLayout from '../components/home/right-layout';
import Text from '../components/form/text-field';
import { Form } from 'react-bootstrap';
import HomePagination from '../components/home/pagination';

import {
    fetchAllAds,
    fetchAllItems,
    fetchCurrentUser
} from '../Store/actions/index';
import { keys } from '../../config/keys';
import FoodCard from '../components/foods/foods';
import List1 from '../components/home/list-group';
import FoodsLayout from '../components/home/foods-layout';
import TypeSelect3 from '../components/form/type-select-3';
import TypeSelect from '../components/form/type-select';
import { Paginate } from '../components/paginate';
import SliderPrice from '../components/home/slider-price';
import CitySelect from '../components/home/city-select';
import GenderSelect from '../components/home/select';

const Home = (props) => {
    const [breedName, setBreedName] = React.useState('');
    const [birdName, setBirdName] = React.useState('');
    const [listValue, setListValue] = React.useState('birds');
    const [liked, setLiked] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState([]);
    const [allAds, setAllAds] = React.useState([]);
    const [twentyAds, setTwentyAds] = React.useState([]);
    const [twentyItems, setTwentyItems] = React.useState([]);
    const [userBirds, setUserBirds] = React.useState([]);
    const [allItems, setAllItems] = React.useState([]);
    const [genderSearch, setGenderSearch] = React.useState('');
    const [ageSearch, setAgeSearch] = React.useState('');
    const [searchTitleSpecie, setSearchTitleSpecie] = React.useState('');
    const [searchCity, setSearchCity] = React.useState('');
    const [searchType, setSearchType] = React.useState('');
    const [searchPrice, setSearchPrice] = React.useState(0);
    const [priceFrom, setPriceFrom] = React.useState('');
    const [priceTo, setPriceTo] = React.useState('');
    const [searchBirdAge, setSearchBirdAge] = React.useState('');

    const [currentPage, updateCurrentPage]: any = React.useState(1);
    const [adsInSinglePage, setAdsInSinglePage] = React.useState(20);

    const [newData, setNewData] = React.useState([]);

    const [pageX, setPageX] = React.useState(0);

    // {props got currentUser property from redux }
    React.useEffect(() => {
        const fetchCurrentUserData = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/users/currentUserData`
            );

            const { data: dataX } = data;
            // if (data.data)
            setUserBirds(data.data.likedBirds);
            setCurrentUser(data);
        };
        fetchCurrentUserData();

        const fetchAllAds = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-all-ads`
            );
            setAllAds(data);
        };
        fetchAllAds();

        const fetchAllItems = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-all-items`
            );
            setAllItems(data);
        };
        fetchAllItems();

        // props.fetchAllItems();
        props.fetchCurrentUser();
    }, []);

    let paginatedAds = [];
    let paginatedItems = [];

    React.useEffect(() => {
        const fetchTwentyAds = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-twenty-ads/${currentPage}`
            );

            setTwentyAds(data || []);
        };
        fetchTwentyAds();

        const fetchTwentyItems = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-twenty-items/${currentPage}`
            );

            setTwentyItems(data || []);
        };
        fetchTwentyItems();
    }, [currentPage]);

    let title;
    if (props.currentUser && props.currentUser.username)
        title = props.currentUser.username;
    else title = 'Home';

    console.log('ALL ITEMS: ', allItems);

    //! This function is for SEO
    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`${title}`}</title>
        </Helmet>
    );

    let searchAds = [...allAds];

    let searchItems = [...allItems];

    if (genderSearch.length) {
        searchAds = searchAds.filter(
            (item) => item.gender.toLowerCase() === genderSearch.toLowerCase()
        );
    }

    if (searchTitleSpecie.length) {
        searchAds = searchAds.filter((item) => {
            return (
                item.specieName
                    .toLowerCase()
                    .includes(searchTitleSpecie.toLowerCase()) ||
                item.title
                    .toLowerCase()
                    .includes(searchTitleSpecie.toLowerCase())
            );
        });

        searchItems = searchItems.filter((item) => {
            return (
                item.specie[0]
                    .toLowerCase()
                    .includes(searchTitleSpecie.toLowerCase()) ||
                item.title
                    .toLowerCase()
                    .includes(searchTitleSpecie.toLowerCase())
            );
        });

        console.log('hello search items: ', searchItems);
    }

    if (searchCity.length) {
        searchAds = searchAds.filter((item) => {
            return item.city.toLowerCase().includes(searchCity.toLowerCase());
        });
    }

    if (priceFrom && priceTo) {
        console.log('hello');

        searchAds = searchAds.filter((item) => {
            if (item.price >= priceFrom && item.price <= priceTo) return item;
        });

        searchItems = searchItems.filter((item) => {
            if (item.price >= priceFrom && item.price <= priceTo) return item;
        });
    }

    if (searchBirdAge.length) {
        searchAds = searchAds.filter((item) => {
            return item.age.toLowerCase().includes(searchBirdAge.toLowerCase());
        });
    }

    if (ageSearch.length) {
        searchItems = searchItems.filter((item) => {
            return item.birdAge.toLowerCase().includes(ageSearch.toLowerCase());
        });
    }

    if (searchType.length) {
        if (searchType === 'F')
            searchItems = searchItems.filter((item) => item.type === 'F');
        if (searchType === 'A')
            searchItems = searchItems.filter((item) => item.type === 'A');
    }

    paginatedAds = [...twentyAds];
    if (
        priceFrom ||
        priceTo ||
        searchTitleSpecie.length ||
        searchCity.length ||
        genderSearch.length ||
        searchBirdAge.length
    ) {
        let searchedAds = [...searchAds];

        paginatedAds = Paginate(searchedAds, adsInSinglePage, currentPage);
    }

    if (
        priceFrom ||
        priceTo ||
        searchTitleSpecie.length ||
        ageSearch ||
        searchBirdAge ||
        searchType.length
    ) {
        // console.log('IM HERE');

        let searchedItems = [...searchItems];
        console.log('SEARCH ITEMS : ', searchItems);

        paginatedItems = Paginate(searchedItems, adsInSinglePage, currentPage);
    } else {
        console.log('not searching');
        paginatedItems = [...twentyItems];
    }

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

    console.log('ALL ADS: ', paginatedAds);

    return (
        <div className="my-5" id="home-page" style={{ minHeight: '75vh' }}>
            {head()}
            {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}

            <div id="home-layout">
                <div className="left">
                    <List1
                        setGenderSearch={setGenderSearch}
                        setAgeSearch={setAgeSearch}
                        value={listValue}
                        setValue={setListValue}
                        setSearchTitleSpecie={setSearchTitleSpecie}
                        setSearchCity={setSearchCity}
                        setSearchType={setSearchType}
                        setPriceFrom={setPriceFrom}
                        setPriceTo={setPriceTo}
                        setSearchBirdAge={setSearchBirdAge}
                        updateCurrentPage={updateCurrentPage}
                    />

                    {/* <h4 className="text-center left-h">Search Through</h4> */}

                    <div
                        className="left-desc my-2"
                        style={{ marginTop: '-10px' }}
                    >
                        <Text
                            label="Title or Bird Name ..."
                            value={searchTitleSpecie}
                            setValue={setSearchTitleSpecie}
                            updateCurrentPage={updateCurrentPage}
                            setPageX={setPageX}
                        />
                    </div>

                    <div className="left-desc my-2">
                        <TypeSelect3
                            type={listValue === 'foods' ? 'age' : 'gender'}
                            ageSearch={ageSearch}
                            setAgeSearch={setAgeSearch}
                            genderSearch={genderSearch}
                            setGenderSearch={setGenderSearch}
                            updateCurrentPage={updateCurrentPage}
                            setPageX={setPageX}
                        />
                    </div>

                    {listValue === 'foods' && (
                        <div className="left-desc">
                            <br />
                            <TypeSelect
                                className="left-desc-1"
                                type={searchType}
                                setType={setSearchType}
                                updateCurrentPage={updateCurrentPage}
                                setPageX={setPageX}
                            />
                        </div>
                    )}

                    {listValue === 'birds' && (
                        <div
                            className="left-desc my-2"
                            style={{ marginTop: '-10px' }}
                        >
                            <GenderSelect
                                title={'Age'}
                                values={ageValues}
                                value={searchBirdAge}
                                setValue={setSearchBirdAge}
                            />
                        </div>
                    )}

                    {listValue === 'birds' && (
                        <div
                            className="left-desc "
                            style={{ marginTop: '-20px' }}
                        >
                            <br />
                            <CitySelect
                                value={searchCity}
                                setValue={setSearchCity}
                                updateCurrentPage={updateCurrentPage}
                            />
                        </div>
                    )}

                    <br />

                    <div
                        className="left-desc  d-flex gap-2"
                        style={{ marginTop: '-30px' }}
                    >
                        <Text
                            label="Price From"
                            value={priceFrom}
                            setValue={setPriceFrom}
                            updateCurrentPage={updateCurrentPage}
                            setPageX={setPageX}
                            type="number"
                        />
                        <Text
                            type="number"
                            label="Price To"
                            value={priceTo}
                            setValue={setPriceTo}
                            updateCurrentPage={updateCurrentPage}
                            setPageX={setPageX}
                        />
                    </div>

                    <br />
                    <br />
                </div>

                <div className="right">
                    {/* {searchTitleSpecie.length &&
          !paginatedAds.length &&
          !paginatedItems.length ? (
            <h4 className="null-setting">
              To Search Through All Data -- you may have to wait for a minute...
            </h4>
          ) : null} */}

                    {/* {ageSearch.length &&
          !paginatedAds.length &&
          !paginatedItems.length ? (
            <h4 className="null-setting">
              To Search Through All Data -- you may have to wait for a minute...
            </h4>
          ) : null} */}

                    {/* {searchCity.length && !paginatedAds.length ? (
            <h4 className="null-setting">
              To Search Through All Data -- you may have to wait for a minute...
            </h4>
          ) : null} */}

                    {/* {searchPrice && !paginatedAds.length && !paginatedItems.length ? (
            <h4 className="null-setting">
              To Search Through All Data -- you may have to wait for a minute...
            </h4>
          ) : null}

          {searchBirdAge.length && !paginatedAds.length ? (
            <h4 className="null-setting">
              To Search Through All Data -- you may have to wait for a minute...
            </h4>
          ) : null} */}

                    {listValue === 'birds' &&
                        paginatedAds.map((ad) => (
                            <RightLayout
                                ads={paginatedAds}
                                ad={ad}
                                itemId={ad && ad.id}
                                genderSearch={genderSearch}
                                ageSearch={ageSearch}
                                searchTitleSpecie={searchTitleSpecie}
                                searchCity={searchCity}
                                searchType={searchType}
                                searchPrice={searchPrice}
                                searchBirdAge={searchBirdAge}
                                currentUser={props.currentUser}
                            />
                        ))}

                    {listValue === 'foods' &&
                        paginatedItems.map((item) => (
                            <FoodsLayout
                                items={paginatedItems}
                                item={item}
                                itemId={item && item.id}
                                genderSearch={genderSearch}
                                ageSearch={ageSearch}
                                searchTitleSpecie={searchTitleSpecie}
                                searchCity={searchCity}
                                searchType={searchType}
                                searchPrice={searchPrice}
                                searchBirdAge={searchBirdAge}
                                currentUser={props.currentUser}
                            />
                        ))}
                </div>
            </div>

            {paginatedAds.length ? (
                <div className="left-desc mb-2" style={{ marginTop: '-20px' }}>
                    <HomePagination
                        adsInSinglePage={adsInSinglePage}
                        adsLength={
                            listValue === 'birds'
                                ? searchAds.length
                                : searchItems.length
                        }
                        updateCurrentPage={updateCurrentPage}
                        setTwentyAds={setTwentyAds}
                        currentPage={currentPage}
                        genderSearch={genderSearch}
                        ageSearch={ageSearch}
                        searchTitleSpecie={searchTitleSpecie}
                        searchCity={searchCity}
                        searchPrice={searchPrice}
                        searchBirdAge={searchBirdAge}
                        pageX={pageX}
                        setPageX={setPageX}
                    />
                </div>
            ) : null}
            <br />
            <br />
            <br />
        </div>
    );
};

function mapStateToProps({ currentUser, allAds, allItems }) {
    return { currentUser, allAds, allItems };
}

export default {
    component: ForBlocked(
        connect(mapStateToProps, {
            fetchCurrentUser,
            fetchAllAds,
            fetchAllItems
        })(Home)
    ) // this styling is for Routes file specially
    // component: connect(mapStateToProps, { fetchUsers })(Home), // this styling is for Routes file specially
    // 2nd property - like {fetchusers} will create fetchUser function in props.
    // and we'll do props.fetchUsers -- and its data will be available in props.
    // but we will have to map that data into the state -- i.e. in maptoState function above
};

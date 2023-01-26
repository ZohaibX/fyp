import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import CustomImageList from '../../components/home/image-list';
import BasicTabs from '../../components/home/text-box';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RequireAuth from '../../components/hocs/require-auth';
import MediaCard from '../../components/home/card';
import Text from '../../components/form/text-field';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import FoodCard from '../../components/foods/foods';

const GetPostedAds = (props) => {
    const [userData, setUserData] = React.useState([]);
    const [likedAds, setLikedAds] = React.useState([]);
    const [userAds, setUserAds] = React.useState([]);

    React.useEffect(() => {
        const userData = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/users/currentUserData`
            );
            setUserData(data.data);
        };
        userData();
    }, []);

    React.useEffect(() => {
        const userLikedItems = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-user-ads`
            );
            setLikedAds(data);
        };
        userLikedItems();
    }, []);

    //! This function is for SEO
    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`Your Ads`}</title>
        </Helmet>
    );

    console.log('USER ADS:', userAds);

    return (
        <div className="container" style={{ minHeight: '75vh' }}>
            {head()}

            <h1 className="text-center my-5 font-weight-bolder">Your Ads</h1>

            {likedAds.map((item) => (
                <div className="">
                    <RightLayout
                        appear="no"
                        ads={likedAds}
                        ad={item}
                        itemId={item && item.id}
                        currentUser={props.currentUser}
                    />
                </div>
            ))}
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

import ForBlocked from '../../components/hocs/for-blocked';
import { head } from '../../../../../server/src/routes/create-test-data';
import FoodsLayout from '../../components/home/foods-layout';
import RightLayout from '../../components/home/right-layout';
export default {
    component: ForBlocked(connect(mapStateToProps)(RequireAuth(GetPostedAds)))
};

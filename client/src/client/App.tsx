import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/header';
import { fetchCurrentUser } from './Store/actions';
import axios from 'axios';
import { connect } from 'react-redux';
import Footer from './components/footer';
import Axios from 'axios';
import { keys } from '../config/keys';

// any route, that is matched by matchRoutes fn, will be passed to this App
// This App component will be directly connected to every route and to the components, we use here - like header
const App = (props) => {
    const [allAds, setAllAds] = React.useState([]);
    const [allItems, setAllItems] = React.useState([]);

    React.useEffect(() => {
        props.fetchCurrentUser();

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
    }, []);

    console.log('CURRENT USER FROM APP.TSX: ', props.currentUser);
    return (
        <div>
            <Header currentUser={props.currentUser} />
            <div
                className="body"
                // style={{ minHeight: '100%', width: '80%' }}
                // style={{ minHeight: '75vh' }}
            ></div>
            {renderRoutes(props.route.routes)}

            <Footer currentUser={props.currentUser} />
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default {
    component: connect(mapStateToProps, { fetchCurrentUser })(App)
    // component: App,
    // loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
//? here, we have loaded current user data into the store
//? this component is directly connected to every route and to the components, we use here - like header
//? we can use this currentUser data there without dispatching currentUser action

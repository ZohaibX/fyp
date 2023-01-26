import * as React from 'react';
import Axios from 'axios'
import { keys } from '../../config/keys';


const Records = () => {
    const [CompletedAds, setCompletedAds] = React.useState([])

    React.useEffect(() => {
        const getCompletedAds = async () => {
            const {data} = await Axios.get(`${keys.BACKEND}/api/user/get-completed-orders`);
            setCompletedAds(data)
        }
        getCompletedAds()
    }, [])

    console.log(CompletedAds);
    
    return <p className="text-center">Records</p>
}

export default {
    component: Records
}
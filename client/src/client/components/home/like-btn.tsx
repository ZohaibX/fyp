import Axios from 'axios';
import * as React from 'react';
import { keys } from '../../../config/keys';

const LikeButton = ({ currentUser, adId }) => {
    const [liked, setLiked] = React.useState(false);
    const [currentUserData, setCurrentUserData] = React.useState([]);

    React.useEffect(() => {
        // if (currentUser.likedBirds.find((item) => item == adId)) setLiked(true);
        const getCurrentUserData = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/users/currentUserData`
            );
            setCurrentUserData(data.data);

            if (data.data && data.data.likedBirds.find((item) => item === adId))
                setLiked(true);
        };

        getCurrentUserData();
    }, []);

    return (
        <i
            className={
                // currentUser.likedBirds.find((item) => item === ad.id)
                liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
            }
            onClick={async () => {
                if (!currentUser) return alert('Please Login First');
                if (liked) {
                    setLiked(false);
                    await Axios.put(
                        `${keys.BACKEND}/api/ads/unlike-bird/${adId}`
                    );
                } else {
                    console.log('im  here 1');
                    setLiked(true);

                    try {
                        await Axios.put(
                            `${keys.BACKEND}/api/ads/like-bird/${adId}`
                        );
                    } catch (error) {
                        console.log('im here');

                        setLiked(false);
                        return alert('Something Went Wrong');
                    }
                }
            }}
        ></i>
    );
};

export default LikeButton;

import Axios from 'axios';
import * as React from 'react';
import { keys } from '../../../config/keys';

const LikeButton2 = ({ currentUser, adId }) => {
  const [liked, setLiked] = React.useState(false);
  const [currentUserData, setCurrentUserData] = React.useState([]);

  React.useEffect(() => {
    // if (currentUser.likedBirds.find((item) => item == adId)) setLiked(true);
    const getCurrentUserData = async () => {
      const { data } = await Axios.get(
        `${keys.BACKEND}/api/users/currentUserData`
      );
      setCurrentUserData(data.data);

      if (data.data && data.data.likedAds.find((item) => item === adId))
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
          Axios.put(`${keys.BACKEND}/api/ads/unlike-item/${adId}`);
        } else {
          setLiked(true);
          Axios.put(`${keys.BACKEND}/api/ads/like-item/${adId}`);
        }
      }}
    ></i>
  );
};

export default LikeButton2;

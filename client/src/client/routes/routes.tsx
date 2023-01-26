import Home from '../pages/home';
import UsersList from '../pages/usersList';
import App from '../App';
import NotFound from '../pages/not-found';
import Admins from '../pages/admins';
import Test from './../pages/test';
import SignUp from '../pages/auth/sign-up';
import SignIn from '../pages/auth/sign-in';
import ChangePassword from '../pages/auth/change-password';
import ForgotPassword from '../pages/auth/forgot-password';
import imageUpload from '../pages/image-upload';
import PostAd from '../pages/ads/post-ad';
import AdDetails from '../pages/ads/ad-details';
import UpdateAd from '../pages/ads/update-ad';
import myAds from '../pages/ads/my-ads';
import profile from '../pages/profile';
import comments from '../pages/comment/comments';
import addQuery from '../pages/comment/add-query';
import PostItem from '../pages/ads/post-item';
import itemDetails from '../pages/ads/item-details';
import updateItem from '../pages/ads/update-item';
import users from '../pages/admin/users';
import orders from '../pages/admin/orders';
import Profile from '../pages/auth/profile';
import othersProfile from '../pages/auth/others-profile';
import Cart from '../pages/cart';
import ViewItems from '../pages/ads/view-items';
import orderDetails from '../pages/order-details';
import records from '../pages/records';
import changePassword from '../pages/change-password';
import getPostedAds from '../pages/ads/get-posted-ads';

export default [
    {
        ...App,
        routes: [
            { path: '/', ...Home, exact: true },
            // { path: '/users', ...UsersList },
            { path: '/admins', ...Admins },
            { path: '/test', ...Test },
            { path: '/register', ...SignUp },
            { path: '/sign-in', ...SignIn },
            { path: `/ad-details-:id-:userId-details-x`, ...AdDetails },
            { path: `/item-details-:id-:orderId-details-x`, ...itemDetails },
            { path: `/update-ad-details-:id-details-x`, ...UpdateAd },
            { path: `/update-item-details-:id-details-x`, ...updateItem },
            { path: `/favorites`, ...myAds },
            { path: `/get-my-ads`, ...getPostedAds },
            { path: `/query-hub`, ...comments },
            { path: `/add-your-query`, ...addQuery },

            { path: `/change-password`, ...changePassword },

            { path: `/your-cart`, ...Cart },
            { path: `/viewing-items-for-:bird`, ...ViewItems },

            { path: `/user-:userId-profile-:test`, ...Profile },
            // { path: `/user-:userId-profile-details`, ...othersProfile },

            { path: `/users`, ...users },
            { path: `/orders`, ...orders },
            { path: `/records`, ...records },
            { path: `/order-details-:id`, ...orderDetails },

            // Replace -- add current user id in params
            { path: '/post-ad', ...PostAd },
            { path: '/post-item', ...PostItem },

            { path: '/change-password', ...ChangePassword },
            { path: '/forgot-password', ...ForgotPassword },
            { path: '/image-upload', ...imageUpload },
            { ...NotFound } // this is how we use not-found page -- by not providing path
        ]
    }
];

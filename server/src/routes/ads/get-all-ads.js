const express = require('express');
const jwt = require('jsonwebtoken');
const {
    BadRequestException,
    NotAuthorizedError
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const { User } = require('../auth/model/model');
const { validateAuthInput } = require('./validation/validate');
const Ad = require('./model/ad');
const Food = require('../foods/model');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.get('/api/ads/get-all-ads', currentUser, async (req, res) => {
    let userId, role;
    if (req.user) {
        userId = req.user.id;
        role = req.user.role;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
        role = req.currentUser.role;
    }

    let interestAds = [];
    let usualAds = [];
    let ads;

    if (userId) {
        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('Something Went Wrong');

        ads = await Ad.find();

        for (let i = 0; i < ads.length; i++) {
            let t = 0;
            for (let j = 0; j < user.interests.length; j++) {
                if (
                    user.interests[j]
                        .toLowerCase()
                        .includes(ads[i].specieName.toLowerCase())
                ) {
                    interestAds.push(ads[i]);
                    t++;
                }
            }
            if (t === 0) usualAds.push(ads[i]);
        }
    } else {
        ads = await Ad.find();
    }

    let ratedAds = [];
    if (interestAds.length || usualAds.length) {
        // sorting the ads of interest -- with the most rated ones
        for (let i = 0; i < interestAds.length - 1; i++) {
            for (let k = i + 1; k < interestAds.length; k++) {
                if (
                    interestAds[i].ratings.totalRatings <
                    interestAds[k].ratings.totalRatings
                ) {
                    let max = interestAds[k];
                    let min = interestAds[i];
                    interestAds[k] = min;
                    interestAds[i] = max;
                }
            }
        }

        ratedAds = [...interestAds, ...usualAds];
    } else {
        ratedAds = [...ads];

        // sorting the ads of interest -- with the most rated ones
        for (let i = 0; i < ratedAds.length - 1; i++) {
            for (let k = i + 1; k < ratedAds.length; k++) {
                if (
                    ratedAds[i].ratings.totalRatings <
                    ratedAds[k].ratings.totalRatings
                ) {
                    let max = ratedAds[k];
                    let min = ratedAds[i];
                    ratedAds[k] = min;
                    ratedAds[i] = max;
                }
            }
        }
    }
    res.send(ratedAds);
});

router.get('/api/ads/get-twenty-ads/:page', currentUser, async (req, res) => {
    let userId, role;
    if (req.user) {
        userId = req.user.id;
        role = req.user.role;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
        role = req.currentUser.role;
    }

    let interestAds = [];
    let usualAds = [];
    let ads;

    if (userId) {
        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('Something Went Wrong');

        ads = await Ad.find();

        if (user.interests.length) {
            for (let i = 0; i < ads.length; i++) {
                let t = 0;
                for (let j = 0; j < user.interests.length; j++) {
                    if (ads[i].specieName === user.interests[j]) {
                        interestAds.push(ads[i]);
                        t++;
                    }
                }
                if (t === 0) usualAds.push(ads[i]);
            }
        } else {
            for (let i = 0; i < ads.length; i++) {
                usualAds.push(ads[i]);
            }
        }
    } else {
        ads = await Ad.find();
    }

    let twentyAds = [];
    if (interestAds.length) {
        let ratedAds = [];

        // sorting the ads of interest -- with the most rated ones
        for (let i = 0; i < interestAds.length - 1; i++) {
            for (let k = i + 1; k < interestAds.length; k++) {
                if (
                    interestAds[i].ratings.totalRatings <
                    interestAds[k].ratings.totalRatings
                ) {
                    let max = interestAds[k];
                    let min = interestAds[i];
                    interestAds[k] = min;
                    interestAds[i] = max;
                }
            }
        }

        let finalData = [...interestAds, ...usualAds];

        for (
            let i = (req.params.page - 1) * 20;
            i < (req.params.page - 1) * 20 + 20;
            i++
        ) {
            if (finalData[i]) twentyAds.push(finalData[i]);
        }
    } else {
        let ratedAds = [...ads];

        // sorting the ads of interest -- with the most rated ones
        for (let i = 0; i < ratedAds.length - 1; i++) {
            for (let k = i + 1; k < ratedAds.length; k++) {
                if (
                    ratedAds[i].ratings.totalRatings <
                    ratedAds[k].ratings.totalRatings
                ) {
                    let max = ratedAds[k];
                    let min = ratedAds[i];
                    ratedAds[k] = min;
                    ratedAds[i] = max;
                }
            }
        }

        let finalData = [...ratedAds];

        for (
            let i = (req.params.page - 1) * 20;
            i < (req.params.page - 1) * 20 + 20;
            i++
        ) {
            if (finalData[i]) twentyAds.push(finalData[i]);
        }
    }

    res.send(twentyAds.reverse());
});

router.post('/api/ads/get-liked-items-x/', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId, role;
    if (req.user) {
        userId = req.user.id;
        role = req.user.role;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
        role = req.currentUser.role;
    }

    const user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError('Error');

    let birds = [...user.likedBirds];
    let items = [...user.likedAds];

    let birdsArray = [];
    for (let i = 0; i < birds.length; i++) {
        let bird = await Ad.findById(birds[i]);
        if (bird) birdsArray.push(bird);
    }

    let itemsArray = [];
    for (let i = 0; i < items.length; i++) {
        let item = await Food.findById(items[i]);
        if (item) itemsArray.push(item);
    }

    res.send([...birdsArray, ...itemsArray]);
});

module.exports = router;

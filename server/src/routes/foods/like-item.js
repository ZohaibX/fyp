const {
    NotAuthorizedError,
    BadRequestException
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../middlewares/current-user');

const Item = require('./model');
const { User } = require('../auth/model/model');
const WishlistBreeds = require('../ads/model/wishlistBreeds');
const Ad = require('../ads/model/ad');
require('dotenv').config();
const router = express.Router();

router.put(
    '/api/ads/like-item/:itemId',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');

        let userId;
        if (req.user) {
            userId = req.user.id;
        } else if (req.currentUser) {
            userId = req.currentUser.id;
        }

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('User Not Found');

        if (user.likedAds.includes(req.params.itemId))
            throw new BadRequestException('Item is in your favorites already');

        user.likedAds.push(req.params.itemId);
        // user.likedAds = [];

        await user.save();

        res.send(user);
    }
);

router.put(
    '/api/ads/like-bird/:itemId',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');

        let userId;
        if (req.user) {
            userId = req.user.id;
        } else if (req.currentUser) {
            userId = req.currentUser.id;
        }

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('User Not Found');

        if (user.likedBirds.includes(req.params.itemId))
            throw new BadRequestException('Item is in your favorites already');

        const ad = await Ad.findById(req.params.itemId);
        if (!ad) throw new BadRequestException('AD NOT FOUND!');

        user.likedBirds.push(req.params.itemId);
        // user.likedAds = [];
        // user.likedBirds = [];

        const wishListBreed = await WishlistBreeds.findOne({
            breedName: ad.specieName
        });

        if (wishListBreed) {
            const index = wishListBreed.emails.indexOf(user.email);
            if (index < 0) wishListBreed.emails.push(user.email);
            await wishListBreed.save();
        } else {
            let notify = WishlistBreeds.build({
                breedName: ad.specieName,
                emails: [user.email]
            });
            await notify.save();
        }

        await user.save();
        res.send(user);
    }
);

router.get('/api/breeds', async (req, res) => {
    const items = await WishlistBreeds.find();

    res.send(items);
});

router.put(
    '/api/ads/unlike-item/:itemId',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');

        let userId;
        if (req.user) {
            userId = req.user.id;
        } else if (req.currentUser) {
            userId = req.currentUser.id;
        }

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('User Not Found');

        if (!user.likedAds.includes(req.params.itemId))
            throw new BadRequestException('Item is already un-liked');

        const items = [...user.likedAds];
        const index = items.indexOf(req.params.itemId);

        user.likedAds.splice(index, 1);

        await user.save();

        res.send(user);
    }
);

router.put(
    '/api/ads/unlike-bird/:itemId',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');

        let userId;
        if (req.user) {
            userId = req.user.id;
        } else if (req.currentUser) {
            userId = req.currentUser.id;
        }

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('User Not Found');

        if (!user.likedBirds.includes(req.params.itemId))
            throw new BadRequestException('Item is already un-liked');

        const items = [...user.likedBirds];
        const index = items.indexOf(req.params.itemId);

        user.likedBirds.splice(index, 1);

        await user.save();

        res.send(user);
    }
);

module.exports = router;

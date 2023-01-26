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
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.get('/api/ads/get-user-ads', currentUser, async (req, res) => {
    console.log('ADS: ');
    // console.log('ADS: ', ads);

    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('Not Authorized');

    // console.log('ADS: ', ads);
    let userId, role;
    if (req.user) {
        userId = req.user.id;
        role = req.user.role;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
        role = req.currentUser.role;
    }
    // console.log('ADS: ', ads);

    let ads;
    if (role === 'Admin') ads = await Ad.find();
    else ads = await Ad.find({ userId });

    console.log('ADS: ', ads);

    res.status(201).send(ads);
});

module.exports = router;

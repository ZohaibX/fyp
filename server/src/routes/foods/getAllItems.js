const express = require('express');
const jwt = require('jsonwebtoken');
const {
  BadRequestException,
  NotAuthorizedError,
} = require('@zbtickets/common');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const Items = require('./model');
const Food = require('./model');
const currentUser = require('../../middlewares/current-user');
const { User } = require('../auth/model/model');

// ! Postman must be used in https version

router.get('/api/ads/get-all-items', currentUser, async (req, res) => {
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

  ads = await Food.find();

  let ratedAds = [...ads];
  console.log("hello");

  // sorting the ads of interest -- with the most rated ones
  for (let i = 0; i < ratedAds.length - 1; i++) {
    for (let k = i + 1; k < ratedAds.length; k++) {
      if (ratedAds[i].ratings.totalRatings < ratedAds[k].ratings.totalRatings) {
        let max = ratedAds[k];
        let min = ratedAds[i];
        ratedAds[k] = min;
        ratedAds[i] = max;
      }
    }

    res.send(ratedAds);
  }
  // const ads = await Items.find();
});

router.get('/api/ads/get-twenty-items/:page', currentUser, async (req, res) => {
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

    ads = await Food.find();

    if (user.interests.length) {
      for (let i = 0; i < ads.length; i++) {
        let t = 0;
        for (let j = 0; j < user.interests.length; j++) {
          if (ads[i].specie === user.interests[j]) {
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
    ads = await Food.find();
  }

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

    let twentyAds = [];

    for (
      let i = (req.params.page - 1) * 20;
      i < (req.params.page - 1) * 20 + 20;
      i++
    ) {
      if (finalData[i]) twentyAds.push(finalData[i]);
    }

    res.send(twentyAds);
  } else {
    let ratedAds = [...ads];

    // sorting the ads of interest -- with the most rated ones
    for (let i = 0; i < ratedAds.length - 1; i++) {
      for (let k = i + 1; k < ratedAds.length; k++) {
        if (
          ratedAds[i].ratings.totalRatings < ratedAds[k].ratings.totalRatings
        ) {
          let max = ratedAds[k];
          let min = ratedAds[i];
          ratedAds[k] = min;
          ratedAds[i] = max;
        }
      }
    }

    let finalData = [...ratedAds];

    let twentyAds = [];
    for (
      let i = (req.params.page - 1) * 20;
      i < (req.params.page - 1) * 20 + 20;
      i++
    ) {
      if (finalData[i]) twentyAds.push(finalData[i]);
    }

    res.send(twentyAds);
  }
});

router.get("/api/ads/display-specific-ads/:birdName" , async (req, res) => {

  
  
  if(!req.params.birdName) throw new BadRequestException("SPECIES ARE NOT SENT");

  const items = await Items.find({birdName: req.params.birdName})
  if(!items) throw new BadRequestException("NOT DATA FOUND");


  // const items = await Items.find();

  res.send(items)
})

module.exports = router;

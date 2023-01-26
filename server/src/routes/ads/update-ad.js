const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../middlewares/current-user');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const Ad = require('./model/ad');
const { User } = require('../auth/model/model');
require('dotenv').config();
const router = express.Router();

// get urls
router.put(
  '/api/ads/update-ad/:id',
  // Replace
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('U r not authorized');

    const {
      birdName,
      specieName,
      adTitle,
      adDescription,
      adPrice,
      contact,
      locationDetails,
      city,
      age,
      gender,favouriteFood
    } = req.body;

    let userId, role;
    if (req.user) {
      userId = req.user.id;
      role = req.user.role;
    } else if (req.currentUser) {
      userId = req.currentUser.id;
      role = req.currentUser.role;
    }

    const ad = await Ad.findById(req.params.id);
    if (!ad) throw new BadRequestException('Ad Not Found Against This Data');

    if (
      JSON.stringify(ad.userId) !== JSON.stringify(userId) &&
      role !== 'Admin'
    )
      throw new NotAuthorizedError(
        "You don't have enough permissions to perform this task"
      );

    // way to update
    ad.set({
      title: adTitle,
       birdName,
      specieName,
      description: adDescription,
      price: adPrice,
      age, gender,favouriteFood
    });
    await ad.save();

    res.send(ad);
  }
);

router.put("/api/ads/mark-sold/:id" , async (req, res) => {

  const ad = await Ad.findById(req.params.id)
  if(!ad) throw new BadRequestException("AD NOT FOUND");

  ad.set({
    sold: true
  })

  await ad.save()

  res.send("Done")

})

router.put("/api/ads/mark-report/:id" , async (req, res) => {

  const ad = await Ad.findById(req.params.id)
  if(!ad) throw new BadRequestException("AD NOT FOUND");

  ad.set({
    reported: true
  })

  await ad.save()

  res.send("Done")

})

router.put('/api/ads/update-ad-ratings/:id', currentUser, async (req, res) => {
  if (!req.currentUser && !req.user)
    throw new NotAuthorizedError('U r not authorized');

  let userId;
  if (req.user) {
    userId = req.user.id;
  } else if (req.currentUser) {
    userId = req.currentUser.id;
  }

  const { rate } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException('Something Went Wrong');

  const ad = await Ad.findById(req.params.id);
  if (!ad) throw new BadRequestException('Ad Not Found Against This Data');

  let alreadyRated = false;
  let previousRate = 0;
  let index = 0;
  for (let i = 0; i < user.rated.length; i++) {
    if (user.rated[i].itemId.includes(req.params.id)) {
      index = i;
      alreadyRated = true;
      previousRate = user.rated[i].rate;
    }
  }

  if (alreadyRated) {
    let userRateds = [...user.rated];
    userRateds.splice(index, 1);

    user.set({
      rated: [...userRateds, { itemId: req.params.id, rate }],
    });

    ad.set({
      ratings: {
        totalRatings: ad.ratings.totalRatings - previousRate + rate,
        RatingIndividuals: ad.ratings.RatingIndividuals,
      },
    });
  } else {
    user.set({
      rated: [...user.rated, { itemId: req.params.id, rate }],
    });

    ad.set({
      ratings: {
        totalRatings: ad.ratings.totalRatings + rate,
        RatingIndividuals: ad.ratings.RatingIndividuals + 1,
      },
    });
  }

  await user.save();
  await ad.save();

  res.send(ad);
});

module.exports = router;

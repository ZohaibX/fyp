const {
  NotAuthorizedError,
  BadRequestException,
} = require('@zbtickets/common');
const mongoose = require('mongoose');
const express = require('express');
const currentUser = require('../../middlewares/current-user');

const { User } = require('../auth/model/model');
const Item = require('./model');
const Food = require('./model');
require('dotenv').config();
const router = express.Router();

// get urls
router.put(
  '/api/ads/update-item/:id',
  // Replace
  currentUser,
  async (req, res) => {
    if (!req.currentUser && !req.user)
      throw new NotAuthorizedError('U r not authorized');

    const { birdName, breedName, title, description, price } = req.body;

    let userId, role;
    if (req.user) {
      userId = req.user.id;
      role = req.user.role;
    } else if (req.currentUser) {
      userId = req.currentUser.id;
      role = req.currentUser.role;
    }

    const ad = await Item.findById(req.params.id);
    if (!ad) throw new BadRequestException('Ad Not Found Against This Data');

    if (role !== 'Admin')
      throw new NotAuthorizedError(
        "You don't have enough permissions to perform this task"
      );

    // way to update
    ad.set({
      title: title,
      birdName: birdName,
      breedName: breedName,
      description: description,
      price: price,
    });
    await ad.save();

    res.send(ad);
  }
);

router.put("/api/items/add-faq/:itemId" , currentUser , async(req, res) => {
  if (!req.currentUser && !req.user)
  throw new NotAuthorizedError('U r not authorized');

let userId;
if (req.user) {
  userId = req.user.id;
} else if (req.currentUser) {
  userId = req.currentUser.id;
}

    const { faq } = req.body;

    const item = await Food.findById(req.params.itemId);
    if(!item) throw new BadRequestException("no item found");

    item.faqs.push(faq)
    await item.save();

    res.send("DONE")
})

router.delete("/api/items/delete-faq/:itemId/:index" , currentUser , async(req, res) => {
  if (!req.currentUser && !req.user)
  throw new NotAuthorizedError('U r not authorized');

let userId;
if (req.user) {
  userId = req.user.id;
} else if (req.currentUser) {
  userId = req.currentUser.id;
}

// console.log(req.params.index);
    const item = await Food.findById(req.params.itemId);
    if(!item) throw new BadRequestException("no item found");

    item.faqs.splice(req.params.index , 1); 
    await item.save();

    res.send("DONE")
})

router.put(
  '/api/items/update-ad-ratings/:id',
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

    const { rate } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('Something Went Wrong');

    const item = await Food.findById(req.params.id);
    if (!item) throw new BadRequestException('Ad Not Found Against This Data');

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

      item.set({
        ratings: {
          totalRatings: item.ratings.totalRatings - previousRate + rate,
          RatingIndividuals: item.ratings.RatingIndividuals,
        },
      });
    } else {
      user.set({
        rated: [...user.rated, { itemId: req.params.id, rate }],
      });

      item.set({
        ratings: {
          totalRatings: item.ratings.totalRatings + rate,
          RatingIndividuals: item.ratings.RatingIndividuals + 1,
        },
      });
    }

    await user.save();

    await item.save();

    res.send(item);
  }
);

module.exports = router;

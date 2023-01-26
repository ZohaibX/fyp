const {
    NotAuthorizedError,
    BadRequestException
} = require('@zbtickets/common');
const express = require('express');
const currentUser = require('../../middlewares/current-user');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const Ad = require('./model/ad');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const router = express.Router();
const { User } = require('../auth/model/model');
const WishlistBreeds = require('./model/wishlistBreeds');
// const { keys } = require('../../../../client/src/config/keys');

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_PUBLIC,
    secretAccessKey: process.env.AWS_PRIVATE
});
const { sendMail } = require('../../services/mailing/server');

// get urls
router.get(
    '/api/ads/ad-upload/get-url/',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');
        // we want our key to be like this -- myUserId/12122113.jpeg -- where filename will be used as a random unique string

        let id;
        // Replace
        if (req.currentUser) id = req.currentUser.id;
        else if (req.user) id = req.user._id;
        // id = 'fakeId';

        let key = `${id}/${uuid()}.jpeg`;

        s3.getSignedUrl(
            'putObject',
            {
                Bucket: 'trade-the-bird-x',
                ContentType: 'image/jpeg',
                Key: key
            },
            (err, url) => res.send({ key, url, err })
        );
    }
);

router.post(
    '/api/ads/ad-upload/',
    // Replace
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('Not Authorized');

        let userId;
        if (req.user) userId = req.user.id;
        else userId = req.currentUser.id;
        // userId = mongoose.Types.ObjectId('62cb7681fc043b1d716e00b7'); // Fake

        const {
            adTitle,
            adDescription,
            adPrice,
            contact,
            locationDetails,
            city,
            specieName,
            birdName,
            gender,
            age,
            images,
            favouriteFood
        } = req.body;
        // images is an array -- of string (url)

        /// https://trade-the-bird.s3.amazonaws.com/[Image Key] -- Save This
        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            imageUrls.push(
                `https://trade-the-bird-x.s3.amazonaws.com/${images[i].key}`
            );
        }

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('Something went wrong!');

        const ad = Ad.build({
            userId,
            user,
            title: adTitle,
            specieName,
            birdName,
            description: adDescription,
            price: adPrice,
            contactNumber: contact,
            images: imageUrls,
            locationDetails: locationDetails,
            city: city,
            age,
            gender,
            date: new Date().toString(),
            favouriteFood
        });

        await ad.save();
        user.ads.push(ad.id);
        await user.save();

        const breed = await WishlistBreeds.findOne({
            breedName: ad.specieName
        });
        console.log('Email: ', breed);

        if (breed && breed.emails && breed.emails.length) {
            let newEmails = [...breed.emails];

            let index = newEmails.indexOf(user.email);
            if (index >= 0) newEmails.splice(index, 1);

            let caption = `${breed.breedName} - Ad Posted`;
            let text = `
            <h4>
            Ad is posted you may be interested in. 
            Please click the link to see that -- ${
                process.env.FRONTEND
            }/ad-details-${btoa(ad.id)}-${btoa(userId)}-details-x
            </h4>
            
            </br>
            </br> <t>Regards - Trade The Bird</t>`;
            // MAILING
            try {
                sendMail(newEmails, caption, text);
            } catch (error) {
                throw new BadRequestError('error coming from sendgrid server');
            }
        }

        console.log('here');

        // MAILING
        const subject = 'Ad is Live Now!';
        const text = `</br>
        <h4>
        Your Ad "${ad.title}" has been posted and is accessible now.
        </h4></br>
    
        <t>Regards - Trade The Bird</t>`;

        try {
            sendMail([user.email], subject, text);
        } catch (error) {
            throw new BadRequestError('error coming from sendgrid server');
        }

        // throw new Error();
        res.send(ad);
    }
);

module.exports = router;

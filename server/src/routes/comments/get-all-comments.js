const express = require('express');
const jwt = require('jsonwebtoken');
const {
    BadRequestException,
    NotAuthorizedError
} = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const Comment = require('./model');
const { User } = require('../auth/model/model');
const router = express.Router();
const Reply = require('./model.replies');
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.get('/api/comments/get-all-comments', async (req, res) => {
    const comments = await Comment.find();

    console.log(comments.reverse());

    res.send(comments);
});

router.get(
    '/api/ads/get-twenty-comments/:page',
    currentUser,
    async (req, res) => {
        const page = req.params.page;

        const commentsArray = [];

        const comments = await Comment.find();

        for (let i = (page - 1) * 20; i < (page - 1) * 20 + 20; i++) {
            if (comments[i]) commentsArray.push(comments[i]);
        }

        console.log(page);

        res.send(commentsArray.reverse());
    }
);

router.get('/api/comments/get-all-replies', async (req, res) => {
    const replies = await Reply.find();

    res.send(replies);
});

module.exports = router;

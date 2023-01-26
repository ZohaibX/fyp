const express = require('express');
const { BadRequestException, NotFoundError } = require('@zbtickets/common');
const currentUser = require('../../middlewares/current-user');
const mongoose = require('mongoose');
const Comment = require('./model');
const Reply = require('./model.replies');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version

router.post('/api/comments/create-comment', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('Not Authorized');

    let userId, userTitle, userEmail;
    if (req.user) {
        userId = mongoose.Types.ObjectId(req.user.id);
        userTitle = req.user.firstName || req.user.full_name;
        userEmail = req.user.email;
    } else {
        userId = mongoose.Types.ObjectId(req.currentUser.id);
        userTitle = req.currentUser.firstName;
        userEmail = req.currentUser.email;
    }

    const { title, specie, description } = req.body;

    let comment;
    try {
        comment = Comment.build({
            userId,
            userTitle,
            userEmail,
            title,
            specie,
            description
        });
        await comment.save();
    } catch (error) {
        throw new Error(error);
    }

    res.status(201).send(comment);
});

router.post(
    '/api/comments/add-reply/:commentId',
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('Not Authorized');

        let userId, userTitle, userEmail;
        if (req.user) {
            userId = mongoose.Types.ObjectId(req.user.id);
            userTitle = req.user.firstName || req.user.full_name;
            userEmail = req.user.email;
        } else {
            userId = mongoose.Types.ObjectId(req.currentUser.id);
            userTitle = req.currentUser.firstName;
            userEmail = req.currentUser.email;
        }

        const { description } = req.body;

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw new NotFoundError('Comment Not Found');

        let reply;
        try {
            reply = Reply.build({
                userId,
                userTitle,
                userEmail,
                description
            });
            await reply.save();
        } catch (error) {
            throw new Error(error);
        }

        comment.replies.push(reply);
        await comment.save();

        res.status(201).send({ reply, comment });
    }
);

module.exports = router;

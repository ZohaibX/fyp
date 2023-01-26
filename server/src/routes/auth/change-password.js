const express = require('express');
const jwt = require('jsonwebtoken');
const { BadRequestException, currentUser } = require('@zbtickets/common');
const { User } = require('./model/model');
const { Password } = require('./password-hashing/hashing');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file
const { sendMail } = require('../../services/mailing/server');
const currentUserMiddleware = require('../../middlewares/current-user');

// ! Postman must be used in https version

router.post('/api/users/forgetPassword', async (req, res) => {
    const { email } = req.body;
    if (!email || email.length < 5)
        throw new BadRequestException('Invalid Email Provided!');

    const user = await User.findOne({ email });
    if (!user)
        throw new BadRequestException('Invalid Credentials - No Email Found!');
    if (user.blocked)
        throw new BadRequestException('Invalid Credentials - User is Blocked!');

    password = Math.floor(10000000 + Math.random() * 90000000); // generate random 8 digit numbers
    user.password = JSON.stringify(password);
    await user.save();

    // MAILING
    const subject = 'Password Change Requested!';
    const text = `</br><h4>You have Requested For A New Password - Please Use This Password To Sign In Back To Your Account</h4></br><h4>Your New Password is ${password}</h4></br></br><t>Regards - Trade The Bird</t>`;

    try {
        sendMail([user.email], subject, text);
    } catch (error) {
        throw new BadRequestError('error coming from sendgrid server');
    }

    res.status(200).send(`Update Password Request Invoked! - ${password}`);
});

router.post(
    '/api/users/changePassword',
    currentUserMiddleware,
    async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword || newPassword.length < 8)
            throw new BadRequestException('Provide Valid Password');

        const user = await User.findById(req.currentUser.id);
        if (!user)
            throw new BadRequestException(
                'Invalid Credentials - No Email Found!'
            );

        const passwordMatch = await Password.compare(
            user.password,
            currentPassword
        );
        if (!passwordMatch)
            throw new BadRequestException('Invalid Credentials');

        user.password = newPassword;
        await user.save();

        res.status(200).send(
            `Update Password Request Invoked! - ${newPassword}`
        );
    }
);

module.exports = router;

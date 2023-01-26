const express = require('express');
const router = express.Router();
require('dotenv').config();
const currentUser = require('../../middlewares/current-user');
const { User } = require('./model/model');
const { BadRequestException } = require('@zbtickets/common');
const { Password } = require('./password-hashing/hashing');
const jwt = require('jsonwebtoken');
const { findByIdAndRemove } = require('../ads/model/ad');

// FIRST NAME
router.put('/api/users/edit-user-firstName', currentUser, async (req, res) => {
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

    const { firstName } = req.body;
    if (!firstName) throw new BadRequestException('First Name is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.firstName = firstName;
    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-lastName', currentUser, async (req, res) => {
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

    const { lastName } = req.body;
    if (!lastName) throw new BadRequestException('Last Name is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.lastName = lastName;
    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-mobile', currentUser, async (req, res) => {
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

    const { mobile } = req.body;
    if (!mobile) throw new BadRequestException('Phone Number is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.phoneNumber = mobile;

    if (
        user.city.length &&
        user.address.length &&
        user.state.length &&
        user.country.length &&
        user.interests.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-city', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const { city } = req.body;
    if (!city) throw new BadRequestException('City Name is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.city = city;

    if (
        user.phoneNumber.length &&
        user.address.length &&
        user.state.length &&
        user.country.length &&
        user.interests.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-address', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const { address } = req.body;
    if (!address) throw new BadRequestException('Address is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.address = address;

    if (
        user.phoneNumber.length &&
        user.city.length &&
        user.state.length &&
        user.country.length &&
        user.interests.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-state', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const { state } = req.body;
    if (!state) throw new BadRequestException('State/Province is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.state = state;

    if (
        user.phoneNumber.length &&
        user.city.length &&
        user.address.length &&
        user.country.length &&
        user.interests.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-country', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const { country } = req.body;
    if (!country) throw new BadRequestException('Country is not provided');

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.country = country;

    if (
        user.phoneNumber.length &&
        user.city.length &&
        user.address.length &&
        user.state.length &&
        user.interests.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send('done');
});

router.put('/api/users/edit-user-password', currentUser, async (req, res) => {
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

    const { currentPassword, newPassword, newPassword2 } = req.body;
    if (!currentPassword && !newPassword && !newPassword2)
        throw new BadRequestException('Something went wrong');

    if (newPassword !== newPassword2) {
        throw new BadRequestException(
            "New Password didn't match in both fields"
        );
    }

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    const passwordMatch = await Password.compare(
        user.password,
        currentPassword
    );
    if (!passwordMatch) throw new BadRequestException('Invalid Credentials');

    user.password = newPassword;
    await user.save();

    res.send('done');
});

router.put('/api/users/edit-user-interests', currentUser, async (req, res) => {
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

    const { interests } = req.body;
    if (!interests) throw new BadRequestException('Interests Must be Provided');

    if (interests.length < 5)
        throw new BadRequestException(
            'AtLeast 5 of the birds should be selected as interests'
        );

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    user.interests = [...interests];

    if (
        user.phoneNumber.length &&
        user.city.length &&
        user.address.length &&
        user.state.length &&
        user.country.length
    ) {
        user.completed_profile = true;
    }
    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send(user);
});

router.put(
    '/api/users/edit-user-profile-pic',
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

        const { imageUrl } = req.body;
        if (!imageUrl)
            throw new BadRequestException("Image Url isn't provided.");

        const user = await User.findById(userId);
        if (!user) throw new BadRequestException('User Not Found!');

        user.imageUrl = `https://trade-the-bird-x.s3.amazonaws.com/${imageUrl.key}`;
        await user.save();

        res.send(user);
    }
);

router.put('/api/user/edit-user-details', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }
    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('User Not Found!');

    // console.log;
    // res.send(req.body.about)
    const {
        date,
        month,
        year,
        gender,
        city,
        state,
        country,
        address,
        about = '',
        phoneNumber,
        species = []
    } = req.body;
    // console.log();
    if (
        !date ||
        !month ||
        !year ||
        !gender ||
        !city ||
        !state ||
        !country ||
        !address ||
        !phoneNumber
    )
        throw new BadRequestException('Not All Details are Provoded. ');

    user.set({
        date,
        month,
        year,
        gender,
        city,
        state,
        country,
        address,
        phoneNumber,
        about,
        interests: species
    });

    if (
        user.date.length &&
        user.month.length &&
        user.year.length &&
        user.gender.length &&
        user.city.length &&
        user.state.length &&
        user.address.length &&
        user.phoneNumber.length
    ) {
        user.completed_profile = true;
    }

    await user.save();

    //? Generating a JWT token
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            blocked: user.blocked,
            completed_profile: user.completed_profile,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            country: user.country,
            likedBirds: user.likedBirds,
            rated: user.rated,
            interests: user.interests,
            date: user.date,
            month: user.month,
            year: user.year
        },
        process.env.JWTKEY,
        { expiresIn: '1h' }
    );

    //? Storing the token in a cookie -- session object
    req.session.jwt = userJwt;

    res.send(user);
});
module.exports = router;

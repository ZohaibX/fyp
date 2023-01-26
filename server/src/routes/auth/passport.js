const express = require('express');
const { User } = require('./model/model');
const app = express();
const session = require('express-session');
var mongoose = require('mongoose');
require('dotenv').config(); //? to use dotenv file

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { BadRequestException } = require('@zbtickets/common');

//! Passport Service
passport.serializeUser((user, done) => {
  done(null, user.id); // user's mongo id from database
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
}); // after getting that id, we will translate that into the data

// NOTE
// I NEED TO ADD ORIGINAL DOMAIN NAME (WEBSITE URL) IN THE https://console.cloud.google.com/apis/credentials?project=passport-setup-295108
// fake fyp.com is not working there -- because it is -- fake .
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleID,
      clientSecret: process.env.GoogleSecret,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user,
        email = profile.emails[0].value;
      email = email.toLowerCase();

      user = await User.findOne({ email });
      if (!user) {
        let role;
        if (email === process.env.ADMIN || email === process.env.ADMIN2)
          role = 'Admin';
        else role = 'User';

        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile._json.picture,
          email,
          role,
          blocked: false,
          completed_profile: false,
          socialAccount: true,
          phoneNumber: '',
          city: '',
        });
        await user.save();
      }
      done(null, user); // null means there is no error
    }
  )
);

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FBID,
      clientSecret: process.env.FBSecret,
      callbackURL: '/api/auth/facebook/callback',
      profileFields: ['id', 'emails', 'displayName', 'gender', 'picture'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user,
        email = profile.emails[0].value;
      email = email.toLowerCase();

      user = await User.findOne({ email });
      if (!user) {
        let role;
        if (email === process.env.ADMIN || email === process.env.ADMIN2)
          role = 'Admin';
        else role = 'User';

        user = new User({
          email,
          role,
          blocked: false,
          completed_profile: false,
          full_name: profile.displayName,
          picture: profile._json.picture.data.url,
          socialAccount: true,
          phoneNumber: '',
          city: '',
        });
        await user.save();
      }
      done(null, user); // null means there is no error
    }
  )
);

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
  '/api/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
); //  we cannot use scope property here -- so we have this similar property in FB Strategy

// Callback Route for FB
app.get(
  '/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND}/`); // we don't have this route here , but we have this route in client folder , so it will work here
  }
);

// Callback Route for google
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND}/`); // we don't have this route here , but we have this route in client folder , so it will work here
  }
);

// Once having done authentication by google or fb
// all data will be available to req.user

// Current User Route has been merged in current-user.js file
// Signing Out Route has Also been merged in sign-out.js file

module.exports = app;

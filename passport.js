// passport.js

require('dotenv').config()
import { use, serializeUser, deserializeUser } from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';


use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:5000/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

serializeUser(function (user, done) {
  done(null, user);
});

deserializeUser(function (user, done) {
  done(null, user);
});
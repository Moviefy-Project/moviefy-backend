const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({
          where: { email_address: profile.emails[0].value },
        });

        if (!user) {
          user = await Users.create({
            email_address: profile.emails[0].value,
            profile_picture: profile.photos[0].value,
          });
        }

        const token = jwt.sign(
          { id: user.id, email_address: user.email_address },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

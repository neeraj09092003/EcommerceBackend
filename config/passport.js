const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/users");
const jwt = require("jsonwebtoken");
console.log("Google ClientID:", process.env.GOOGLE_CLIENT_ID);
/**
 * Google OAuth Strategy Configuration
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,           // from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,   // from .env
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by email (Google always provides verified email)
        let user = await User.findOne({ email: profile.emails[0].value });

        // If not found, create a new user
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-oauth", // placeholder (not used for login)
          });
        }

        // Generate JWT token for the user
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Pass user and token to next step
        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// These are required for Passport, even if not using sessions
passport.serializeUser((obj, done) => {
  done(null, obj);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
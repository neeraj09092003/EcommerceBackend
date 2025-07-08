const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser } = require("../controllers/auth.controllers");
const { protect } = require("../middleware/auth.middleware");

// ===== LOCAL AUTH =====

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/me (protected)
router.get("/me", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// ===== GOOGLE OAUTH =====

// @route   GET /api/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// @route   GET /api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // Success: redirect to frontend with JWT
    const token = req.user.token;
    res.redirect(`https://hilarious-douhua-57ddd0.netlify.app//login?token=${token}`);
  }
);

module.exports = router;
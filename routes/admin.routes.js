const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  getAllOrders,
  getDashboardStats,
} = require("../controllers/admin.controller");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/orders", protect, adminOnly, getAllOrders);
router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;

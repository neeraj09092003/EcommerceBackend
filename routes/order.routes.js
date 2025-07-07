const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

// 🧾 Place a new order (User)
router.post("/", protect, placeOrder);

// 📦 Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// 🛠️ Admin: Get all orders
router.get("/", protect, adminOnly, getAllOrders);

// 🛠️ Admin: Update order status
router.put("/:orderId/status", protect, adminOnly, updateOrderStatus);

module.exports = router;

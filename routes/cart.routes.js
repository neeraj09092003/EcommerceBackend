const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controllers");

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);

module.exports = router;

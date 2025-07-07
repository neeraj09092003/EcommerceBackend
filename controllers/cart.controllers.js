const Cart = require("../models/cart");
const Product = require("../models/product");

// @desc    Get current user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to get cart", error: err.message });
  }
};

// @desc    Add or update product in cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart, create one
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity = quantity;
    } else {
      // Add new product
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

// @desc    Remove product from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    console.log(
      "Before removal:",
      cart.items.map((item) => item.product.toString())
    );

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    console.log(
      "After removal:",
      cart.items.map((item) => item.product.toString())
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing from cart", error: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};

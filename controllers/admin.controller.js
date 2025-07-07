const User = require("../models/users");
const Order = require("../models/orders");
const Product = require("../models/product"); 
// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();

  // Revenue calculation
  const orders = await Order.find().populate("items.product");
  let totalRevenue = 0;
  let monthlyRevenue = Array(12).fill(0); // Jan-Dec

  orders.forEach(order => {
    order.items.forEach(item => {
      if (item.product && item.product.price) {
        const price = item.product.price * item.quantity;
        totalRevenue += price;
        const month = new Date(order.createdAt).getMonth();
        monthlyRevenue[month] += price;
      }
    });
  });

  // Category distribution
const products = await Product.find();
const categoryMap = {};
products.forEach(p => {
  // Normalize: lowercase and singularize (remove trailing 's' if present)
  let cat = p.category ? p.category.trim().toLowerCase() : "uncategorized";
  if (cat.endsWith("s")) cat = cat.slice(0, -1);
  categoryMap[cat] = (categoryMap[cat] || 0) + 1;
});
const categoryDistribution = Object.entries(categoryMap).map(([category, count]) => ({
  category: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize
  count
}));

  res.json({
    totalUsers,
    totalOrders,
    totalProducts,
    totalRevenue,
    monthlyRevenue, // [Jan, Feb, ...]
    categoryDistribution,
  });
};



module.exports = {
  getAllUsers,
  getAllOrders,
  getDashboardStats,
};

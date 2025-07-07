const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Add this line
dotenv.config();
connectDB();

const app = express();
app.use(cors({origin: "https://ecommercewebsitefrontend.netlify.app",credentials: true}));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// Import routes
const authRoutes = require("./routes/auth.routes");

// Use routes
app.use("/api/auth", authRoutes); // now /api/auth/register and /login are active
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", require("./routes/admin.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

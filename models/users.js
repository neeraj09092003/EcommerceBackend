const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false, // true = admin, false = customer
    },
  },
  { timestamps: true }
  
);

module.exports = mongoose.model("User", userSchema);

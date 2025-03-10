const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("../helpers/response");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    successResponse(res, null, "User registered successfully");
  } catch (error) {
    errorResponse(res, "Server Error", 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // res.json({ message: "Login successful", token });
    successResponse(res, token, "Login successful");

  } catch (error) {
    errorResponse(res, "Server Error", 500);
  }
};

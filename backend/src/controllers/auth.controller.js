const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;

// Signup user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userWithExistingEmail = await User.findOne({ email });
    console.log("The User:", userWithExistingEmail);
    if (userWithExistingEmail) {
      return res.status(401).json({ message: "User with email exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
      });

      res
        .status(200)
        .json({ message: "Login successful", token: accessToken, user });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// User details
exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({
        message: "User details fetched successfully",
        user,
      });
    } else {
      res.status(404).json({ message: "User details not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

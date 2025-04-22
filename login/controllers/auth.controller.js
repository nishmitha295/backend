const db = require("../models");       // ✅ Only once
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

// ... rest of signup and signin functions


exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,  // Add this field
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role || 'user' // Default to 'user' if not provided
    });
    res.status(201).send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from DB
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Compare the entered password with the hashed password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }); // 24 hours

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



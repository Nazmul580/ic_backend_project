const { connectDB, closeDB } = require("../db");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  await connectDB();
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    const user = await newUser.save();
    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    await closeDB();
  }
};

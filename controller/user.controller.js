const { connectDB, closeDB } = require("../db");
const Porduct = require("../models/product.model");
const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
  await connectDB();
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await closeDB();
  }
};

exports.updateUser = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(id);
    const updatedUser = await User.findByIdAndUpdate(id, {
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await closeDB();
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const user = await Porduct.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

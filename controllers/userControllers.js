const User = require("../models/userModel");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // Sorting by creation date (latest first)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,  // In a real application, you should hash the password before saving.
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};

// GET a user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

// PUT (Update) a user by ID
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password, phone_number, gender, date_of_birth, membership_status },
      { new: true } // Returns the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send(); // No content to return on successful deletion
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };

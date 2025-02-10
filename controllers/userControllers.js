const User = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};


const createUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Failed to create user" });
    }

    const newUser = new User({
      name,
      email,
      password,  
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


const updateUser = async (req, res) => {
  const { userId } = req.params;


  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password, phone_number, gender, date_of_birth, membership_status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { userId } = req.params;


  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };

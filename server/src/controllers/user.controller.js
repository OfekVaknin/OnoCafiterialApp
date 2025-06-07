import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password"); // exclude passwords
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id, "-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ error: "Invalid email or password" });

  // Optional: exclude password
  const { password: _, ...userData } = user.toObject();
  res.json(userData);
};

// This code defines a user controller for managing user data in a Node.js application.
// It includes functions to get all users, get a user by ID, register a new user, and delete a user.

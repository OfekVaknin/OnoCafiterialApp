// src/routes/user.routes.js

import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  deleteUser,
   login,
} from "../controllers/user.controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// GET by ID
router.get("/:id", getUserById);

// POST register
router.post("/register", registerUser);

// DELETE user
router.delete("/:id", deleteUser);

router.post("/login", login);

export default router;

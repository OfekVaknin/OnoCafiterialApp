// src/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/user.routes.js";
import menuCategoryRoutes from "./routes/menuCategory.routes.js";
import menuItemsRoutes from "./routes/menuItem.routes.js";
import orderRoutes from "./routes/order.routes.js";

import ensureAdminUser from "./utils/seedAdmin.js";

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const APP_URL = process.env.APP_URL || "http://localhost:5173";

// Connect to MongoDB
await connectDB();

// Middleware
app.use(
  cors({
    origin: APP_URL,
    credentials: true,
  })
);
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Ono Cafeteria API is running 🚀");
});

// User Routes
app.use("/api/auth", userRoutes);
app.use("/api/menu-categories", menuCategoryRoutes);
app.use("/api/menu-items", menuItemsRoutes);
app.use("/api/orders", orderRoutes);

// Admin User Seeder
await ensureAdminUser();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

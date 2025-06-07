import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItem.controller.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", createMenuItem);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;

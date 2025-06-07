import MenuCategory from "../models/menuCategory.model.js";
import { v4 as uuidv4 } from "uuid";

// GET all categories
export const getAllCategories = async (req, res) => {
  const categories = await MenuCategory.find().sort({ createdAt: -1 });
  const formatted = categories.map((cat) => ({
    id: cat._id.toString(),
    name: cat.name,
    description: cat.description,
    createdAt: cat.createdAt.toISOString(),
  }));
  res.json(formatted);
};

// GET single category by ID
export const getCategoryById = async (req, res) => {
  const category = await MenuCategory.findById(req.params.id);
  if (!category) return res.status(404).json({ error: "Category not found" });

  res.json({
    id: category._id.toString(),
    name: category.name,
    description: category.description,
    createdAt: category.createdAt.toISOString(),
  });
};

// POST - Create category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new MenuCategory({ name, description });
  const saved = await newCategory.save();

  res.status(201).json({
    id: saved._id.toString(),
    name: saved.name,
    description: saved.description,
    createdAt: saved.createdAt.toISOString(),
  });
};

// PATCH - Update category
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;

  const updated = await MenuCategory.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Category not found" });

  res.json({
    id: updated._id.toString(),
    name: updated.name,
    description: updated.description,
    createdAt: updated.createdAt.toISOString(),
  });
};

// DELETE - Remove category
export const deleteCategory = async (req, res) => {
  await MenuCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};

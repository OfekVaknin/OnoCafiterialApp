import MenuItem from "../models/menuItem.model.js";

// GET all menu items
export const getAllMenuItems = async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  const formatted = items.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
    categoryId: item.categoryId,
    available: item.available,
    preparingTimeInMin: item.preparingTimeInMin,
  }));
  res.json(formatted);
};

// GET menu item by ID
export const getMenuItemById = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Menu item not found" });

  res.json({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.imageUrl,
    categoryId: item.categoryId,
    available: item.available,
    preparingTimeInMin: item.preparingTimeInMin,
  });
};

// POST - Create menu item
export const createMenuItem = async (req, res) => {
  const {
    name,
    description,
    price,
    imageUrl,
    categoryId,
    available,
    preparingTimeInMin,
  } = req.body;

  const newItem = new MenuItem({
    name,
    description,
    price,
    imageUrl,
    categoryId,
    available,
    preparingTimeInMin,
  });

  const saved = await newItem.save();

  res.status(201).json({
    id: saved._id.toString(),
    name: saved.name,
    description: saved.description,
    price: saved.price,
    imageUrl: saved.imageUrl,
    categoryId: saved.categoryId,
    available: saved.available,
    preparingTimeInMin: saved.preparingTimeInMin,
  });
};

// PATCH - Update menu item
export const updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) return res.status(404).json({ error: "Menu item not found" });

  res.json({
    id: updated._id.toString(),
    name: updated.name,
    description: updated.description,
    price: updated.price,
    imageUrl: updated.imageUrl,
    categoryId: updated.categoryId,
    available: updated.available,
    preparingTimeInMin: updated.preparingTimeInMin,
  });
};

// DELETE - Remove menu item
export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Menu item deleted" });
};

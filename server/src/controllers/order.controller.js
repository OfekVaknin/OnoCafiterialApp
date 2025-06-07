import Order from "../models/order.model.js";

// GET all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

// GET orders by userId
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.json(orders);
};

// GET order by ID
export const getOrderById = async (req, res) => {
  const order = await Order.findOne({ id: req.params.id });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

// POST - Create order
export const createOrder = async (req, res) => {
  const exists = await Order.findOne({ id: req.body.id });
  if (exists) return res.status(400).json({ error: "Order already exists" });

  const created = await Order.create(req.body);
  res.status(201).json(created);
};

// PATCH - Update order
export const updateOrder = async (req, res) => {
  console.log("🚀 ~ updateOrder ~ req.params.id:", req.params.id);
  const updated = await Order.findByIdAndUpdate(
    req.params.id, 
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Order not found" });
  res.json(updated);
};

// DELETE - Remove order
export const deleteOrder = async (req, res) => {
  const deleted = await Order.findOneAndDelete({ id: req.params.id });

  if (!deleted) return res.status(404).json({ error: "Order not found" });
  res.json({ message: "Order deleted" });
};

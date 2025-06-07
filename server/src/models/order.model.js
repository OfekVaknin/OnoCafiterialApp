// src/models/order.model.js
const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  menuItemId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  createdAt: { type: String, required: true },
  documentNumber: Number,
  updatedAt: String,
  preparingTimeInMin: Number,
  readyAt: String,
  items: [OrderItemSchema],
});

module.exports = mongoose.model("Order", OrderSchema); // ✅ this is what you need

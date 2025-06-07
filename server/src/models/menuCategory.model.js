import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model("MenuCategory", menuCategorySchema);
// This schema defines a menu category with a name and an optional description.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
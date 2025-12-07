const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    legacyItemId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    kind: {
      type: String,
      enum: ["sale", "rental"],
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

itemSchema.index({ kind: 1 });

module.exports = mongoose.model("Item", itemSchema);

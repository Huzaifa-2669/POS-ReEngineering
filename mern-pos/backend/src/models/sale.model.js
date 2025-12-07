const mongoose = require("mongoose");

const { Schema } = mongoose;

const saleLineItemSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const saleSchema = new Schema(
  {
    cashierId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    items: {
      type: [saleLineItemSchema],
      default: [],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

saleSchema.index({ cashierId: 1 });
saleSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Sale", saleSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const returnLineItemSchema = new Schema(
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

const returnSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["unsatisfactory", "rental"],
      required: true,
    },
    cashierId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    items: {
      type: [returnLineItemSchema],
      default: [],
    },
    feeAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

returnSchema.index({ type: 1 });
returnSchema.index({ customerId: 1 });
returnSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Return", returnSchema);

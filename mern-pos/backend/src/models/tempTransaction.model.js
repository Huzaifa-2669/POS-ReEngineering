const mongoose = require("mongoose");

const { Schema } = mongoose;

const tempTransactionItemSchema = new Schema(
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
  },
  { _id: false }
);

const tempTransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["sale", "rental", "return"],
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
      type: [tempTransactionItemSchema],
      default: [],
    },
    context: {
      type: Schema.Types.Mixed,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

tempTransactionSchema.index({ cashierId: 1 });
tempTransactionSchema.index({ customerId: 1 });
tempTransactionSchema.index({ type: 1 });
tempTransactionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, sparse: true });

module.exports = mongoose.model("TempTransaction", tempTransactionSchema);

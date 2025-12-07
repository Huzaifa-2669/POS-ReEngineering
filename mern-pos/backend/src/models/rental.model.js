const mongoose = require("mongoose");

const { Schema } = mongoose;

const rentalSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
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
    rentedAt: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returned: {
      type: Boolean,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
    cashierId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

rentalSchema.index({ customerId: 1 });
rentalSchema.index({ itemId: 1 });
rentalSchema.index({ returned: 1, dueDate: 1 });

module.exports = mongoose.model("Rental", rentalSchema);

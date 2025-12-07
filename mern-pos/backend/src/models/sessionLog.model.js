const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionLogSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    action: {
      type: String,
      enum: ["login", "logout"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

sessionLogSchema.index({ employeeId: 1 });
sessionLogSchema.index({ action: 1 });
sessionLogSchema.index({ timestamp: 1 });

module.exports = mongoose.model("SessionLog", sessionLogSchema);

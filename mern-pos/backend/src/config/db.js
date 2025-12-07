const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/mern-pos";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

module.exports = { connectDb };

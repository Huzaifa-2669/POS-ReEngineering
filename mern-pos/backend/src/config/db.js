const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  console.log("MongoDB connected");

  // Attempt to list all databases after successful connection
  try {
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    const names = databases.map((d) => d.name).join(", ");
    console.log(`MongoDB databases: ${names || "<none>"}`);
  } catch (err) {
    console.warn(
      "Could not list databases (insufficient privileges or error)",
      err.message
    );
  }
};

module.exports = { connectDb };

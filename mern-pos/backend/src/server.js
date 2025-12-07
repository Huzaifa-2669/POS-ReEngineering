const app = require("./app");
const mongoose = require("mongoose");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

const mongoose = require("mongoose");

jest.setTimeout(30000);

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

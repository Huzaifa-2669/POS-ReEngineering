const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

// Lightweight liveness check without /api prefix
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", routes);

module.exports = app;

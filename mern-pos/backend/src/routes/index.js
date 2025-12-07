const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/auth", require("./auth.routes"));
router.use("/employees", require("./employee.routes"));
router.use("/items", require("./item.routes"));
router.use("/customers", require("./customer.routes"));
router.use("/transactions", require("./transaction.routes"));
router.use("/logs", require("./log.routes"));

module.exports = router;

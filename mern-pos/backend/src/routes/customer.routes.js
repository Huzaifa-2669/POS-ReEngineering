const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/:phone", customerController.getByPhone);
router.post("/", customerController.create);

module.exports = router;

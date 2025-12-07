const express = require("express");
const router = express.Router();
const logController = require("../controllers/log.controller");

router.get("/sessions", logController.getSessions);
router.get("/sales", logController.getSales);

module.exports = router;

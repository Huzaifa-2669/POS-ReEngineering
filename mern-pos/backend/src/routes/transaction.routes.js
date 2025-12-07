const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/sale", transactionController.createSale);
router.post("/rental", transactionController.createRental);
router.post("/return", transactionController.createReturn);

module.exports = router;

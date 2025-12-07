const transactionService = require("../services/transaction.service");

const createSale = async (req, res) => {
  try {
    const sale = await transactionService.createSale(req.body);
    return res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    const status = err.message && err.message.includes("stock") ? 400 : 400;
    return res.status(status).json({ message: err.message || "Failed to create sale" });
  }
};

const createRental = async (req, res) => {
  try {
    const result = await transactionService.createRental(req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to create rental" });
  }
};

const createReturn = async (req, res) => {
  try {
    const result = await transactionService.createReturn(req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to process return" });
  }
};

module.exports = {
  createSale,
  createRental,
  createReturn,
};

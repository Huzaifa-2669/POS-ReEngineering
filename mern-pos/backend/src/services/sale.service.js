const Sale = require("../models/sale.model");

const listSales = async () => {
  return Sale.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("cashierId", "username firstName lastName position")
    .populate("items.itemId", "name legacyItemId");
};

module.exports = {
  listSales,
};

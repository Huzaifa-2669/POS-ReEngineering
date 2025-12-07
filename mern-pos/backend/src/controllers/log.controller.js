const sessionLogService = require("../services/sessionLog.service");
const saleService = require("../services/sale.service");

const getSessions = async (req, res) => {
  try {
    const logs = await sessionLogService.getSessionLogs();
    return res.json(logs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch logs" });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await saleService.listSales();
    return res.json(sales);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch sales" });
  }
};

module.exports = {
  getSessions,
  getSales,
};

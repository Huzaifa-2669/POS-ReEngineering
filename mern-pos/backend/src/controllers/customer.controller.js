const customerService = require("../services/customer.service");

const getByPhone = async (req, res) => {
  try {
    const customer = await customerService.findCustomerByPhone(req.params.phone);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.json(customer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch customer" });
  }
};

const create = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    return res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to create customer" });
  }
};

module.exports = {
  getByPhone,
  create,
};

const Customer = require("../models/customer.model");

const normalizePhone = (phone) => (phone || "").replace(/\D/g, "");

const findCustomerByPhone = async (phone) => {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;
  return Customer.findOne({ phone: normalized });
};

const createCustomer = async ({ phone, name }) => {
  const normalized = normalizePhone(phone);
  if (!normalized) {
    throw new Error("Phone number is required");
  }

  const existing = await Customer.findOne({ phone: normalized });
  if (existing) return existing;

  return Customer.create({
    phone: normalized,
    name,
  });
};

const findOrCreateCustomer = async ({ phone, name }) => {
  const existing = await findCustomerByPhone(phone);
  if (existing) return existing;
  return createCustomer({ phone, name });
};

module.exports = {
  findCustomerByPhone,
  createCustomer,
  findOrCreateCustomer,
  normalizePhone,
};

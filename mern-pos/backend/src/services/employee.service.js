const Employee = require("../models/employee.model");
const { hashPassword } = require("./auth.service");

const getAllEmployees = async () => {
  return Employee.find().sort({ createdAt: -1 });
};

const createEmployee = async ({ username, position, firstName, lastName, password }) => {
  if (!username || !password || !position || !firstName || !lastName) {
    throw new Error("Missing required employee fields");
  }

  const existing = await Employee.findOne({ username });
  if (existing) {
    throw new Error("Username already exists");
  }

  const passwordHash = await hashPassword(password);

  return Employee.create({
    username,
    position,
    firstName,
    lastName,
    passwordHash,
  });
};

const updateEmployee = async (id, updates) => {
  const updateData = { ...updates };

  if (updates.password) {
    updateData.passwordHash = await hashPassword(updates.password);
    delete updateData.password;
  }

  const updated = await Employee.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updated;
};

const deleteEmployee = async (id) => {
  return Employee.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

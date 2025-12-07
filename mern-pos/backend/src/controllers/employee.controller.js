const employeeService = require("../services/employee.service");

const sanitizeEmployee = (employee) => {
  if (!employee) return employee;
  const obj = employee.toObject ? employee.toObject() : employee;
  const { passwordHash, ...rest } = obj;
  return rest;
};

const getAll = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    return res.json(employees.map(sanitizeEmployee));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch employees" });
  }
};

const create = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    return res.status(201).json(sanitizeEmployee(employee));
  } catch (err) {
    console.error(err);
    const status = err.message && err.message.includes("exists") ? 400 : 500;
    return res.status(status).json({ message: err.message || "Failed to create employee" });
  }
};

const update = async (req, res) => {
  try {
    const updated = await employeeService.updateEmployee(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json(sanitizeEmployee(updated));
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to update employee" });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await employeeService.deleteEmployee(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json({ message: "Employee deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete employee" });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};

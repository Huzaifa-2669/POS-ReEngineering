const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Employee = require("../models/employee.model");
const sessionLogService = require("./sessionLog.service");

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
  if (!plainPassword) {
    throw new Error("Password is required");
  }
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const comparePassword = async (plainPassword, passwordHash) => {
  if (!plainPassword || !passwordHash) return false;
  return bcrypt.compare(plainPassword, passwordHash);
};

const generateToken = () => crypto.randomBytes(24).toString("hex");

const login = async (username, password) => {
  const employee = await Employee.findOne({ username });
  if (!employee) return null;

  const valid = await comparePassword(password, employee.passwordHash);
  if (!valid) return null;

  await sessionLogService.logLogin(employee._id, new Date(), `${employee.username} logged in`);

  return {
    token: generateToken(),
    employee,
  };
};

const logout = async (employeeId) => {
  if (employeeId) {
    const employee = await Employee.findById(employeeId);
    const name =
      employee && employee.firstName
        ? `${employee.firstName} ${employee.lastName}`.trim()
        : employee?.username || "employee";
    await sessionLogService.logLogout(
      employeeId,
      new Date(),
      `${name} logged out`
    );
  }
  return true;
};

module.exports = {
  login,
  logout,
  hashPassword,
  comparePassword,
};

const authService = require("../services/auth.service");

const sanitizeEmployee = (employee) => {
  if (!employee) return employee;
  const obj = employee.toObject ? employee.toObject() : employee;
  const { passwordHash, ...rest } = obj;
  return rest;
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const session = await authService.login(username, password);
    if (!session) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      token: session.token,
      employee: sanitizeEmployee(session.employee),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
};

const logout = async (req, res) => {
  try {
    const { employeeId } = req.body || {};
    await authService.logout(employeeId);
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = {
  login,
  logout,
};

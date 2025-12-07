const SessionLog = require("../models/sessionLog.model");

const buildMessage = (action, extraInfo) => {
  if (!extraInfo) return `Employee ${action}`;
  return typeof extraInfo === "string" ? extraInfo : JSON.stringify(extraInfo);
};

const logAction = async (employeeId, action, timestamp = new Date(), extraInfo) => {
  return SessionLog.create({
    employeeId,
    action,
    timestamp,
    message: buildMessage(action, extraInfo),
  });
};

const logLogin = (employeeId, timestamp = new Date(), extraInfo) =>
  logAction(employeeId, "login", timestamp, extraInfo);

const logLogout = (employeeId, timestamp = new Date(), extraInfo) =>
  logAction(employeeId, "logout", timestamp, extraInfo);

const getSessionLogs = async () => {
  return SessionLog.find().sort({ timestamp: -1 });
};

module.exports = {
  logLogin,
  logLogout,
  getSessionLogs,
};

// Prefer explicit env override; fall back to dev-friendly default (backend runs on 5000 here).
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "/api");

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.message || "Request failed";
    throw new Error(message);
  }

  return data;
};

export const login = (credentials) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });

export const logout = (payload) =>
  request("/auth/logout", { method: "POST", body: JSON.stringify(payload) });

export const getEmployees = () => request("/employees");
export const createEmployee = (payload) =>
  request("/employees", { method: "POST", body: JSON.stringify(payload) });
export const updateEmployee = (id, payload) =>
  request(`/employees/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteEmployee = (id) =>
  request(`/employees/${id}`, { method: "DELETE" });

export const getItems = () => request("/items");
export const createSale = (payload) =>
  request("/transactions/sale", { method: "POST", body: JSON.stringify(payload) });
export const createRental = (payload) =>
  request("/transactions/rental", { method: "POST", body: JSON.stringify(payload) });
export const createReturn = (payload) =>
  request("/transactions/return", { method: "POST", body: JSON.stringify(payload) });

export const getSessionLogs = () => request("/logs/sessions");
export const getSalesLogs = () => request("/logs/sales");

export const createCustomer = (payload) =>
  request("/customers", { method: "POST", body: JSON.stringify(payload) });

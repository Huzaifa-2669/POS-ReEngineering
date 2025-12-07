import { useEffect, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getSessionLogs,
  getSalesLogs,
  updateEmployee,
} from "../api/client";

const defaultForm = {
  username: "",
  position: "cashier",
  firstName: "",
  lastName: "",
  password: "",
};

const AdminDashboard = ({ session, onLogout, onOpenCashier }) => {
  const [employees, setEmployees] = useState([]);
  const [logs, setLogs] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [empData, logData, salesData] = await Promise.all([
        getEmployees(),
        getSessionLogs(),
        getSalesLogs(),
      ]);
      setEmployees(empData);
      setLogs(logData);
      setSales(salesData);
    } catch (err) {
      setError(err.message || "Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createEmployee(form);
      setForm(defaultForm);
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to create employee");
    }
  };

  const startEdit = (emp) => {
    setEditEmployee(emp);
    setEditForm({
      position: emp.position,
      firstName: emp.firstName,
      lastName: emp.lastName,
      password: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editEmployee) return;
    setError("");
    try {
      await updateEmployee(editEmployee._id, editForm);
      setEditEmployee(null);
      setEditForm({});
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to update employee");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteEmployee(id);
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to delete employee");
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Signed in as {session?.employee?.firstName} {session?.employee?.lastName}</p>
        </div>
        <div className="actions">
          <button onClick={onOpenCashier}>Open Cashier View</button>
          <button onClick={onLogout} className="secondary">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="grid">
        <div className="card">
          <h3>Employees</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.username}</td>
                  <td>
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td>{emp.position}</td>
                  <td>
                    <button onClick={() => startEdit(emp)}>Edit</button>
                    <button className="secondary" onClick={() => handleDelete(emp._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Add Employee</h3>
          <form className="form" onSubmit={handleCreate}>
            <label>
              Username
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            </label>
            <label>
              Role
              <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
                <option value="cashier">Cashier</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              First Name
              <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            </label>
            <label>
              Last Name
              <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
            </label>
            <label>
              Password
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </label>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>

      {editEmployee && (
        <div className="card">
          <h3>Edit Employee: {editEmployee.username}</h3>
          <form className="form inline-form" onSubmit={handleUpdate}>
            <label>
              Role
              <select value={editForm.position} onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}>
                <option value="cashier">Cashier</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              First Name
              <input value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} required />
            </label>
            <label>
              Last Name
              <input value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} required />
            </label>
            <label>
              New Password (optional)
              <input type="password" value={editForm.password || ""} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
            </label>
            <div className="actions">
              <button type="submit">Save</button>
              <button type="button" className="secondary" onClick={() => setEditEmployee(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Session Logs</h3>
        <div className="log-list">
          {logs.map((log) => (
            <div key={log._id} className="log-row">
              <span>{new Date(log.timestamp).toLocaleString()}</span>
              <span>{log.action}</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Recent Sales</h3>
        <table className="table">
          <thead>
            <tr>
              <th>When</th>
              <th>Cashier</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{new Date(sale.createdAt).toLocaleString()}</td>
                <td>
                  {sale.cashierId?.firstName
                    ? `${sale.cashierId.firstName} ${sale.cashierId.lastName}`
                    : sale.cashierId?.username || "Unknown"}
                </td>
                <td>
                  {sale.items
                    ?.map((i) => {
                      const label =
                        typeof i.itemId === "object" && i.itemId?.name
                          ? i.itemId.name
                          : i.itemId;
                      return `${i.quantity}x ${label}`;
                    })
                    .join(", ")}
                </td>
                <td>${sale.totalAmount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

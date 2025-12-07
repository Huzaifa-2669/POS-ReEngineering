const CashierDashboard = ({ session, onStartTransaction, onLogout }) => {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2>Cashier Dashboard</h2>
          <p>Welcome, {session?.employee?.firstName}</p>
        </div>
        <button className="secondary" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="card">
        <h3>Select Operation</h3>
        <div className="actions">
          <button onClick={() => onStartTransaction("sale")}>Perform Sale</button>
          <button onClick={() => onStartTransaction("rental")}>Perform Rental</button>
          <button onClick={() => onStartTransaction("return")}>Process Return</button>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;

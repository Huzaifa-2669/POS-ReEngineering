import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import CashierDashboard from "./components/CashierDashboard";
import TransactionPage from "./components/TransactionPage";
import PaymentPage from "./components/PaymentPage";
import { logout as apiLogout } from "./api/client";

function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState("login");
  const [transactionData, setTransactionData] = useState(null);

  const goHome = () => {
    if (!session) {
      setView("login");
    } else {
      const role = session.employee.position;
      setView(role === "admin" ? "admin" : "cashier");
    }
  };

  const handleLogin = (data) => {
    setSession(data);
    const role = data.employee.position;
    setView(role === "admin" ? "admin" : "cashier");
  };

  const handleLogout = async () => {
    if (session?.employee?._id) {
      await apiLogout({ employeeId: session.employee._id }).catch(() => {});
    }
    setSession(null);
    setTransactionData(null);
    setView("login");
  };

  const handleStartTransaction = (mode) => {
    setTransactionData({ mode, cart: [] });
    setView("transaction");
  };

  const handleTransactionReady = (data) => {
    setTransactionData(data);
    setView("payment");
  };

  const handlePaymentComplete = () => {
    setTransactionData(null);
    goHome();
  };

  const handleBackToDashboard = () => {
    setTransactionData(null);
    goHome();
  };

  return (
    <div className="App">
      {view === "login" && <LoginPage onLogin={handleLogin} />}

      {view === "admin" && session && (
        <AdminDashboard
          session={session}
          onLogout={handleLogout}
          onOpenCashier={() => setView("cashier")}
        />
      )}

      {view === "cashier" && session && (
        <CashierDashboard session={session} onStartTransaction={handleStartTransaction} onLogout={handleLogout} />
      )}

      {view === "transaction" && session && transactionData && (
        <TransactionPage
          session={session}
          mode={transactionData.mode}
          onProceed={handleTransactionReady}
          onCancel={handleBackToDashboard}
        />
      )}

      {view === "payment" && session && transactionData && (
        <PaymentPage
          session={session}
          transaction={transactionData}
          onComplete={handlePaymentComplete}
          onCancel={() => setView("transaction")}
        />
      )}
    </div>
  );
}

export default App;

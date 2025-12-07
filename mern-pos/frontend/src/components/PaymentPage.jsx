import { useMemo, useState } from "react";
import { createRental, createReturn, createSale } from "../api/client";

const TAX_RATE = 0.07;

const PaymentPage = ({ session, transaction, onComplete, onCancel }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => transaction.cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    [transaction.cart]
  );
  const tax = transaction.mode === "sale" ? Number((subtotal * TAX_RATE).toFixed(2)) : 0;
  const total = Number((subtotal + tax).toFixed(2));

  const finalize = async () => {
    setError("");
    setStatus("");
    setLoading(true);
    try {
      if (transaction.mode === "sale") {
        await createSale({
          cashierId: session.employee._id,
          items: transaction.cart.map(({ itemId, quantity }) => ({ itemId, quantity })),
        });
        setStatus("Sale recorded");
      } else if (transaction.mode === "rental") {
        await createRental({
          cashierId: session.employee._id,
          customerPhone: transaction.customerPhone,
          returnDate: transaction.returnDate,
          items: transaction.cart.map(({ itemId, quantity }) => ({ itemId, quantity })),
        });
        setStatus("Rental recorded");
      } else if (transaction.mode === "return") {
        await createReturn({
          cashierId: session.employee._id,
          type: transaction.returnType,
          customerPhone: transaction.customerPhone,
          items: transaction.cart.map(({ itemId, quantity }) => ({ itemId, quantity })),
        });
        setStatus("Return processed");
      }
      onComplete();
    } catch (err) {
      setError(err.message || "Failed to finalize transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2>Payment & Confirmation</h2>
          <p>Mode: {transaction.mode}</p>
        </div>
        <button className="secondary" onClick={onCancel}>
          Back
        </button>
      </header>

      {error && <div className="error">{error}</div>}
      {status && <div className="success">{status}</div>}

      <div className="card">
        <h3>Summary</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transaction.cart.map((line) => (
              <tr key={line.itemId}>
                <td>{line.name}</td>
                <td>{line.quantity}</td>
                <td>${(line.unitPrice * line.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transaction.mode !== "return" && <p>Customer: {transaction.customerPhone || "N/A"}</p>}
        {transaction.mode === "rental" && <p>Return Date: {transaction.returnDate}</p>}

        <div className="totals">
          <div>Subtotal: ${subtotal.toFixed(2)}</div>
          {transaction.mode === "sale" && <div>Tax (7%): ${tax.toFixed(2)}</div>}
          <div className="total">Total: ${total.toFixed(2)}</div>
        </div>

        <div className="actions">
          <button onClick={finalize} disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </button>
          <button className="secondary" onClick={onCancel}>
            Edit Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

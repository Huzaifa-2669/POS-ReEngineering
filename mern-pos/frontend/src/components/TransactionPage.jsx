import { useEffect, useMemo, useState } from "react";
import { getItems } from "../api/client";

const TransactionPage = ({ session, mode, onProceed, onCancel }) => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnType, setReturnType] = useState("rental");
  const [error, setError] = useState("");

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((err) => setError(err.message || "Failed to load items"));
  }, []);

  const filteredItems = useMemo(() => {
    if (mode === "sale") return items.filter((i) => i.kind === "sale");
    if (mode === "rental") return items.filter((i) => i.kind === "rental");
    if (mode === "return") {
      return items.filter((i) => (returnType === "unsatisfactory" ? i.kind === "sale" : i.kind === "rental"));
    }
    return items;
  }, [items, mode, returnType]);

  const addToCart = () => {
    setError("");
    const item = filteredItems.find((i) => i._id === selectedItemId);
    if (!item) {
      setError("Select an item to add");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be positive");
      return;
    }

    const existing = cart.find((c) => c.itemId === item._id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.itemId === item._id ? { ...c, quantity: c.quantity + Number(quantity) } : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          itemId: item._id,
          name: item.name,
          quantity: Number(quantity),
          unitPrice: item.unitPrice,
          kind: item.kind,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.itemId !== id));
  };

  const handleProceed = () => {
    setError("");
    if (!cart.length) {
      setError("Add at least one item");
      return;
    }
    if (mode === "rental" && !customerPhone) {
      setError("Customer phone is required for rentals");
      return;
    }
    if (mode === "rental" && !returnDate) {
      setError("Return date is required for rentals");
      return;
    }
    if (mode === "return" && returnType === "rental" && !customerPhone) {
      setError("Customer phone is required for rental returns");
      return;
    }

    onProceed({
      mode,
      cart,
      customerPhone,
      returnDate,
      returnType,
      cashierId: session.employee._id,
    });
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2>
            {mode === "sale" && "Sale"}
            {mode === "rental" && "Rental"}
            {mode === "return" && "Return"}
          </h2>
          <p>Cashier: {session?.employee?.firstName}</p>
        </div>
        <button className="secondary" onClick={onCancel}>
          Back
        </button>
      </header>

      {mode === "return" && (
        <div className="card">
          <label>
            Return Type
            <select value={returnType} onChange={(e) => setReturnType(e.target.value)}>
              <option value="rental">Rental return</option>
              <option value="unsatisfactory">Unsatisfactory (store return)</option>
            </select>
          </label>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="grid">
        <div className="card">
          <h3>Select Items</h3>
          <div className="form inline-form">
            <label>
              Item
              <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)}>
                <option value="">-- choose --</option>
                {filteredItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    #{item.legacyItemId || "N/A"} - {item.name} (${item.unitPrice})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Qty
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </label>
            <button type="button" onClick={addToCart}>
              Add
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((line) => (
                <tr key={line.itemId}>
                  <td>{line.name}</td>
                  <td>{line.quantity}</td>
                  <td>${(line.unitPrice * line.quantity).toFixed(2)}</td>
                  <td>
                    <button className="secondary" onClick={() => removeFromCart(line.itemId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Details</h3>
          {mode !== "sale" && (
            <label>
              Customer Phone
              <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="10 digits" />
            </label>
          )}

          {mode === "rental" && (
            <label>
              Return Date
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </label>
          )}

          <div className="actions">
            <button onClick={handleProceed}>Proceed to Payment</button>
            <button className="secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;

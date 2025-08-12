import React, { useState, useEffect } from "react";

const categories = ["Food", "Rent", "Travel", "Shopping", "Others"];

const AddExpenseModal = ({ show, onClose, onSuccess }) => {
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: categories[0],
    description: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setNewExpense({
        date: "",
        category: categories[0],
        description: "",
        amount: "",
      });
      setError(null);
      setLoading(false);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (
      !newExpense.date ||
      !newExpense.description ||
      !newExpense.amount ||
      !newExpense.category
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(newExpense),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add expense");
      }

      onSuccess(newExpense);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Expense</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={newExpense.date}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={newExpense.category}
                onChange={handleChange}
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={newExpense.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                min="0"
                value={newExpense.amount}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;

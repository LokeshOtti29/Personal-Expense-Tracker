import React, { useEffect, useState } from "react";

const categories = ["Food", "Rent", "Travel", "Shopping", "Others"];
const formatDate = (isoString) => (isoString ? isoString.split("T")[0] : "");

const EditExpenseModal = ({ show, onClose, expense, onSave }) => {
  const [editExpense, setEditExpense] = useState({
    date: "",
    category: categories[0],
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (show && expense) {
      setEditExpense(expense);
    }
  }, [show, expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (
      !editExpense.date ||
      !editExpense.description ||
      !editExpense.amount ||
      !editExpense.category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...editExpense,
        date: formatDate(editExpense.date),
      };

      const response = await fetch(
        `http://localhost:5000/expenses/edit/${editExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update expense");
      }

      alert("Expense updated successfully!");
      onSave(editExpense);
      onClose();
    } catch (error) {
      alert(error.message);
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
            <h5 className="modal-title">Edit Expense</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formatDate(editExpense.date)}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={editExpense.category}
                onChange={handleChange}
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
                value={editExpense.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                min="0"
                value={editExpense.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;

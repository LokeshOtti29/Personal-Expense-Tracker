import React from "react";

const categories = ["Food", "Rent", "Travel", "Shopping", "Others"];

const AddExpenseModal = ({ show, onClose, onSave }) => {
  const [newExpense, setNewExpense] = React.useState({
    date: "",
    category: categories[0],
    description: "",
    amount: "",
  });

  React.useEffect(() => {
    if (show) {
      setNewExpense({
        date: "",
        category: categories[0],
        description: "",
        amount: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (
      !newExpense.date ||
      !newExpense.description ||
      !newExpense.amount ||
      !newExpense.category
    ) {
      alert("Please fill all fields");
      return;
    }
    onSave(newExpense);
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
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={newExpense.date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={newExpense.category}
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
                value={newExpense.description}
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
                value={newExpense.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;

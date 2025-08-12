import React, { useState, useEffect } from "react";
import EditExpenseModal from "./Update";
import AddExpenseModal from "./Add";

const categories = ["Food", "Rent", "Travel", "Shopping", "Others"];

const Table = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/expenses/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch expenses");
      }

      setExpenses(data.expenses || []);
      setFilter("All");
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (index) => {
    setCurrentEditIndex(index);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setCurrentEditIndex(null);
    setShowEditModal(false);
  };

  const handleAddExpenseSuccess = (newExpense) => {
    fetchExpenses();
    setFilter("All");
    closeAddModal();
  };

  const handleSaveEdit = (updatedExpense) => {
    fetchExpenses();
    closeEditModal();
  };

  const handleDelete = async (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmed) return;

    try {
      const expenseToDelete = expenses[index];
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/expenses/delete/${expenseToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete expense");
      }

      fetchExpenses();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Expenses</h5>
        <div className="d-flex align-items-center">
          <select
            className="form-select me-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary me-3"
            onClick={() => setFilter("All")}
          >
            Reset
          </button>
          <button className="btn btn-sm btn-success" onClick={openAddModal}>
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div
        className="table-responsive"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <table className="table table-bordered table-hover">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th className="text-end">Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, i) => (
                <tr key={expense.id || i}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td className="text-end">{expense.amount}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => openEditModal(expenses.indexOf(expense))}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(expenses.indexOf(expense))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddExpenseModal
        show={showAddModal}
        onClose={closeAddModal}
        onSuccess={handleAddExpenseSuccess}
      />

      {currentEditIndex !== null && (
        <EditExpenseModal
          show={showEditModal}
          onClose={closeEditModal}
          expense={expenses[currentEditIndex]}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Table;

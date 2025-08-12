import React, { useState } from "react";
import EditExpenseModal from "./Update";
import AddExpenseModal from "./Add";

const initialExpenses = [
  {
    date: "2025-01-05",
    category: "Food",
    description: "Groceries",
    amount: 50,
  },
  {
    date: "2025-01-08",
    category: "Rent",
    description: "January Rent",
    amount: 500,
  },
  { date: "2025-01-10", category: "Travel", description: "Taxi", amount: 20 },
  {
    date: "2025-01-15",
    category: "Shopping",
    description: "Clothes",
    amount: 120,
  },
  {
    date: "2025-01-20",
    category: "Others",
    description: "Gym Membership",
    amount: 40,
  },
  { date: "2025-01-22", category: "Food", description: "Dinner", amount: 30 },
  {
    date: "2025-01-25",
    category: "Rent",
    description: "Security Deposit",
    amount: 1000,
  },
  {
    date: "2025-01-27",
    category: "Travel",
    description: "Flight Ticket",
    amount: 300,
  },
  {
    date: "2025-01-29",
    category: "Shopping",
    description: "Shoes",
    amount: 80,
  },
];

const categories = ["Food", "Rent", "Travel", "Shopping", "Others"];

const Table = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filter, setFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

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

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
    setFilter("All");
    closeAddModal();
  };

  const handleSaveEdit = (updatedExpense) => {
    setExpenses((prev) => {
      const updated = [...prev];
      updated[currentEditIndex] = updatedExpense;
      return updated;
    });
    closeEditModal();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((_, i) => i !== index));
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
          <button className="btn btn-sm btn-success " onClick={openAddModal}>
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div
        className="table-responsive"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <table className="table table-bordered table-hover">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th className="text-end">Amount ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => {
                const realIndex = expenses.indexOf(expense);
                return (
                  <tr key={realIndex}>
                    <td>{expense.date}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td className="text-end">{expense.amount}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openEditModal(realIndex)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(realIndex)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
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
        onSave={handleAddExpense}
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

import React, { useState } from "react";

const Table = () => {
  const allExpenses = [
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

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Food", "Rent", "Travel", "Shopping", "Others"];

  const filteredExpenses =
    filter === "All"
      ? allExpenses
      : allExpenses.filter((expense) => expense.category === filter);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Expenses</h5>
        <div className="d-flex">
          <select
            className="form-select me-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={() => setFilter("All")}>
            Reset
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
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td className="text-end">{expense.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

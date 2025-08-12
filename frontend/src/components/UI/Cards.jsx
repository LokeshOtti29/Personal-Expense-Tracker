import React from "react";

const Cards = () => {
  const weeklySummary = {
    total: 1000,
    categories: {
      Food: 300,
      Rent: 400,
      Travel: 150,
      Shopping: 100,
      Others: 50,
    },
  };

  let monthlyTotal = 4500;
  const monthName = "August";

  if (!weeklySummary) {
    return <p>No weekly summary data available</p>;
  }

  const { total: weeklyTotal, categories } = weeklySummary;

  return (
    <div
      className="card shadow p-4"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <div
        className="d-flex justify-content-between align-items-center m-2"
        style={{ fontSize: "0.9rem" }}
      >
        <div>
          <small className="text-muted">{monthName}</small>
        </div>

        <div className="text-center">
          <small>This Week's Expense</small>
          <br />
          <small className="text-primary fw-bold">
            ${weeklyTotal.toFixed(2)}
          </small>
        </div>

        <div className="text-end">
          <small>Total Month</small>
          <br />
          <small className="text-success fw-bold">
            ${monthlyTotal?.toFixed(2) ?? "0.00"}
          </small>
        </div>
      </div>

      <hr />

      <div>
        <h6>Expenses by Category</h6>
        {Object.entries(categories).map(([category, amount]) => (
          <div
            key={category}
            className="d-flex justify-content-between border-bottom py-2"
            style={{ fontSize: "0.9rem" }}
          >
            <span>{category}</span>
            <span className="fw-semibold">${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

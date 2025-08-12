import React from "react";
import Doughnut from "./Doughnut";
import Bar from "./Bar";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row g-4 align-items-stretch">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">
                Expense by Category
              </h5>
              <Doughnut />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">
                Monthly Expense Trend
              </h5>
              <Bar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

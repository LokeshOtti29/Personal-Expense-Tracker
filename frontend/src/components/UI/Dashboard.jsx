import React, { useState, useEffect } from "react";
import Doughnut from "./Doughnut";
import Bar from "./Bar";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    doughnutData: [],
    barData: [],
  });

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/expenses/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setDashboardData({
          doughnutData: data.dashboard?.doughnutData || [],
          barData: data.dashboard?.barData || [],
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-4 align-items-stretch">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">
                Expense by Category
              </h5>
              <Doughnut data={dashboardData.doughnutData} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">
                Monthly Expense Trend
              </h5>
              <Bar data={dashboardData.barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

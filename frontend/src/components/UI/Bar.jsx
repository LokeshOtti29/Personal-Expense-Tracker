import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar as BarChart } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

const Bar = () => {
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [500, 400, 700, 300, 600, 800],
        backgroundColor: "#36A2EB",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="chart-container" style={{ height: "300px" }}>
      <BarChart
        data={monthlyData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default Bar;

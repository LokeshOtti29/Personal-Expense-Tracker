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

const Bar = ({ data }) => {
  const monthlyData = {
    labels: data?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Monthly Expenses",
        data: data?.map((item) => item.total) || [],
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

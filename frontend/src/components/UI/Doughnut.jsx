import React from "react";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, Title, ArcElement);

const Doughnut = ({ data }) => {
  const categoryData = {
    labels: data?.map((item) => item.category) || [],
    datasets: [
      {
        data: data?.map((item) => item.total) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF4B6B",
          "#2E91D9",
          "#E6B800",
          "#3FAFAF",
          "#7D4DFF",
        ],
      },
    ],
  };

  return (
    <div className="chart-container" style={{ height: "300px" }}>
      <DoughnutChart
        data={categoryData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default Doughnut;

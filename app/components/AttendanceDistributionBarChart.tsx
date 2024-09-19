"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceDistributionBarChart = ({ attendanceData }: { attendanceData: number[] }) => {
  const data = {
    labels: ["<60%", "60-70%", "70-80%", "80-90%", "90-100%"],
    datasets: [
      {
        label: "Attendance Distribution",
        data: attendanceData,
        backgroundColor: "#0073e6",
      },
    ],
  };

  return (
    <section className="bar-chart">
      <h2>Attendance Distribution</h2>
      <Bar data={data} />
    </section>
  );
};

export default AttendanceDistributionBarChart;

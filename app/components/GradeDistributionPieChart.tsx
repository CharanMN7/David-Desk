import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const GradeDistributionPieChart = ({ gradeData }: { gradeData: number[] }) => {
  const data = {
    labels: ["A", "B", "C", "D","E", "F"],
    datasets: [
      {
        label: "Grade Distribution",
        data: gradeData,
        backgroundColor: [
          "#4caf50", // A: Green
          "#ffeb3b", // B: Yellow
          "#f57f17", // C: Orange
          "#e64a19", // D: Red
          "0000FF", //E:blue
          "#212121", // F: Black
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <section className="pie-chart">
      <h2>Grade Distribution</h2>
      <Pie data={data} />
    </section>
  );
};

export default GradeDistributionPieChart;

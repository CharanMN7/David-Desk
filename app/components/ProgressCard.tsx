"use client";
import { stringify } from "querystring";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCard = ({
  heading,
  value,
  positiveAttribute,
  negativeAttribute,
}: {
  heading: string;
  value: number;
  positiveAttribute: string;
  negativeAttribute: string;
}) => {
  return (
    <section className="progress-card">
      <h2>{heading}</h2>
      <div className="progress-content">
        <div className="progress">
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            styles={buildStyles({
              textSize: "16px",
              textColor: "#000",
              pathColor: "#0073e6",
              trailColor: "#f0f0f0",
            })}
          />
        </div>
        <div className="legend">
          <LegendItem title={positiveAttribute} color="blue" />
          <LegendItem title={negativeAttribute} color="grey" />
        </div>
      </div>
    </section>
  );
};
export default ProgressCard;

const LegendItem = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="legend-item">
      <div className={`legend-item-${color}`}></div>
      <p>{title}</p>
    </div>
  );
};

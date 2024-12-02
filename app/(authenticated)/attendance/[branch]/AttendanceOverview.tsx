import React from "react";

interface AttendanceOverviewProps {
  data: {
    totalAttendancePercentage: number;
    averageAttendancePerSection: number;
    totalStudents: number;
    totalClassesHeld: number;
    totalAbsentStudents: number;
  };
}

export const AttendanceOverview = ({ data }: AttendanceOverviewProps) => {
  return (
    <div>
      <h2>Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Attendance Percentage</td>
            <td>{data.totalAttendancePercentage}%</td>
          </tr>
          <tr>
            <td>Average Attendance per Section</td>
            <td>{data.averageAttendancePerSection}%</td>
          </tr>
          <tr>
            <td>Total Number of Students</td>
            <td>{data.totalStudents}</td>
          </tr>
          <tr>
            <td>Total Classes Held</td>
            <td>{data.totalClassesHeld}</td>
          </tr>
          <tr>
            <td>Total Number of Absent Students</td>
            <td>{data.totalAbsentStudents}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

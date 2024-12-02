import React from "react";

interface SectionWiseMetricsProps {
  sections: {
    name: string;
    attendancePercentage: number;
    studentsPresent: number;
    studentsAbsent: number;
    averageAttendancePerClass: number;
  }[];
}

export const SectionWiseMetrics = ({ sections }: SectionWiseMetricsProps) => {
  return (
    <div>
      <h2>Section-wise Metrics</h2>
      {sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>Section {section.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Attendance Percentage</td>
                <td>{section.attendancePercentage}%</td>
              </tr>
              <tr>
                <td>Number of Students Present</td>
                <td>{section.studentsPresent}</td>
              </tr>
              <tr>
                <td>Number of Students Absent</td>
                <td>{section.studentsAbsent}</td>
              </tr>
              <tr>
                <td>Average Attendance per Class</td>
                <td>{section.averageAttendancePerClass}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

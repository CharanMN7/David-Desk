import React from 'react';

interface SectionWiseMetricsProps {
  branch: string;
}

export const SectionWiseMetrics: React.FC<SectionWiseMetricsProps> = ({ branch }) => {
  // You can fetch this data dynamically from an API or use mock data
  const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div>
      <h2>Section-wise Metrics</h2>
      {sections.map((section) => (
        <div key={section}>
          <h3>Section {section}</h3>
          <p>Attendance Percentage: 90%</p>
          <p>Number of Students Present: 35</p>
          <p>Number of Students Absent: 5</p>
          <p>Average Attendance per Class: 85%</p>
        </div>
      ))}
    </div>
  );
};

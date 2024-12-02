import React from 'react';

interface AttendanceOverviewProps {
  branch: string;
}

export const AttendanceOverview: React.FC<AttendanceOverviewProps> = ({ branch }) => {
  // You should fetch the data from a backend or a mock dataset
  const totalAttendance = 85; // Example value
  const avgAttendancePerSection = 80; // Example value
  const totalStudents = 200; // Example value
  const totalClassesHeld = 50; // Example value
  const totalAbsentees = 20; // Example value

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Attendance Percentage: {totalAttendance}%</p>
      <p>Average Attendance per Section: {avgAttendancePerSection}%</p>
      <p>Total Number of Students: {totalStudents}</p>
      <p>Total Classes Held: {totalClassesHeld}</p>
      <p>Total Number of Absent Students: {totalAbsentees}</p>
    </div>
  );
};

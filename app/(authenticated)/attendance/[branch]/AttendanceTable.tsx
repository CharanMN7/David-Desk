import React from "react";

interface Student {
  name: string;
  rollNumber: string;
  totalClassesAttended: number;
  totalClassesAbsent: number;
  attendancePercentage: number;
}

interface AttendanceTableProps {
  students: Student[];
}

const AttendanceTable = ({ students }: AttendanceTableProps) => {
  return (
    <table border="1" style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Roll Number</th>
          <th>Total Classes Attended</th>
          <th>Total Classes Absent</th>
          <th>Attendance (%)</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.rollNumber}</td>
            <td>{student.totalClassesAttended}</td>
            <td>{student.totalClassesAbsent}</td>
            <td>{student.attendancePercentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;

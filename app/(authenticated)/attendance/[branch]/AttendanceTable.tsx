import React from 'react';

interface AttendanceTableProps {
  branch: string;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ branch }) => {
  // This is mock data; in a real app, it should be fetched from a backend
  const students = [
    {
      name: 'Student 1',
      rollNumber: '12345',
      classesAttended: 20,
      classesAbsent: 5,
      attendancePercentage: '80%',
      averageAttendancePerClass: '85%',
      lastAttendanceDate: '2024-11-29',
    },
    {
      name: 'Student 2',
      rollNumber: '12346',
      classesAttended: 18,
      classesAbsent: 7,
      attendancePercentage: '72%',
      averageAttendancePerClass: '75%',
      lastAttendanceDate: '2024-11-29',
    },
  ];

  return (
    <div>
      <h2>Detailed Attendance Table</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Total Classes Attended</th>
            <th>Total Classes Absent</th>
            <th>Attendance (%)</th>
            <th>Average Attendance Per Class</th>
            <th>Last Date of Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.classesAttended}</td>
              <td>{student.classesAbsent}</td>
              <td>{student.attendancePercentage}</td>
              <td>{student.averageAttendancePerClass}</td>
              <td>{student.lastAttendanceDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

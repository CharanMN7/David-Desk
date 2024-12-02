'use client';
import React from "react";
import { AttendanceOverview } from "./AttendanceOverview";
import AttendanceTable from "./AttendanceTable";
import {SectionWiseMetrics} from "./SectionWiseMetrics";
import {SectionAttendanceChart} from "./SectionAttendanceChart";

const BranchAttendancePage = () => {
  const overviewData = {
    totalAttendancePercentage: 85,
    averageAttendancePerSection: 80,
    totalStudents: 200,
    totalClassesHeld: 50,
    totalAbsentStudents: 20,
  };

  const sectionsData = [
    {
      name: "A",
      attendancePercentage: 90,
      studentsPresent: 35,
      studentsAbsent: 5,
      averageAttendancePerClass: 85,
    },
    {
      name: "B",
      attendancePercentage: 85,
      studentsPresent: 30,
      studentsAbsent: 10,
      averageAttendancePerClass: 80,
    },
    {
      name: "C",
      attendancePercentage: 88,
      studentsPresent: 33,
      studentsAbsent: 7,
      averageAttendancePerClass: 82,
    },
    {
      name: "D",
      attendancePercentage: 82,
      studentsPresent: 28,
      studentsAbsent: 12,
      averageAttendancePerClass: 75,
    },
    {
      name: "E",
      attendancePercentage: 87,
      studentsPresent: 32,
      studentsAbsent: 8,
      averageAttendancePerClass: 78,
    },
    {
      name: "F",
      attendancePercentage: 84,
      studentsPresent: 31,
      studentsAbsent: 9,
      averageAttendancePerClass: 76,
    },
  ];

  const studentsDataBySection = {
    A: [
      { name: "Student 1", rollNumber: "A123", totalClassesAttended: 20, totalClassesAbsent: 5, attendancePercentage: 80 },
      { name: "Student 2", rollNumber: "A124", totalClassesAttended: 18, totalClassesAbsent: 7, attendancePercentage: 72 },
    ],
    B: [
      { name: "Student 3", rollNumber: "B123", totalClassesAttended: 22, totalClassesAbsent: 3, attendancePercentage: 88 },
      { name: "Student 4", rollNumber: "B124", totalClassesAttended: 19, totalClassesAbsent: 6, attendancePercentage: 76 },
    ],
    C: [
      { name: "Student 5", rollNumber: "C123", totalClassesAttended: 21, totalClassesAbsent: 4, attendancePercentage: 84 },
      { name: "Student 6", rollNumber: "C124", totalClassesAttended: 20, totalClassesAbsent: 5, attendancePercentage: 80 },
    ],
    D: [
      { name: "Student 7", rollNumber: "D123", totalClassesAttended: 23, totalClassesAbsent: 2, attendancePercentage: 92 },
      { name: "Student 8", rollNumber: "D124", totalClassesAttended: 17, totalClassesAbsent: 8, attendancePercentage: 68 },
    ],
    E: [
      { name: "Student 9", rollNumber: "E123", totalClassesAttended: 25, totalClassesAbsent: 0, attendancePercentage: 100 },
      { name: "Student 10", rollNumber: "E124", totalClassesAttended: 19, totalClassesAbsent: 6, attendancePercentage: 76 },
    ],
    F: [
      { name: "Student 11", rollNumber: "F123", totalClassesAttended: 24, totalClassesAbsent: 1, attendancePercentage: 96 },
      { name: "Student 12", rollNumber: "F124", totalClassesAttended: 18, totalClassesAbsent: 7, attendancePercentage: 72 },
    ],
  };

  return (
    <div>
      <AttendanceOverview data={overviewData} />
      <SectionWiseMetrics sections={sectionsData} />
      <SectionAttendanceChart sections={sectionsData} />
      
      {Object.entries(studentsDataBySection).map(([section, students]) => (
        <div key={section}>
          <h2>Section {section} - Detailed Attendance Table</h2>
          <AttendanceTable students={students} />
        </div>
      ))}
    </div>
  );
};

export default BranchAttendancePage; // Corrected export

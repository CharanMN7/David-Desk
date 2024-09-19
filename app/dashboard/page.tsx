"use client";
import GradeDistributionPieChart from "../components/GradeDistributionPieChart";
import AttendanceDistributionBarChart from "../components/AttendanceDistributionBarChart";
import { useState } from "react";
import { PageLayout } from "../components/layouts/page-layout/PageLayout";
import ProgressCard from "../components/ProgressCard";
import Section from "../components/Section";
import "./dashboard.module.css";

import { data_dummy, DataType } from "../data/data";

// Define in-charge for each class section
const inChargeMapping: { [key: string]: string } = {
  "cse-a": "Dr. Aditi Sharma",
  "cse-b": "Prof. Rajesh Kumar",
  "cse-c": "Dr. Neha Reddy",
  "cse-d": "Prof. Suresh Iyer",
};

const getAttendanceAveragePercentage = (class_data: Array<DataType>) => {
  let total = 0;
  for (let i = 0; i < class_data.length; i++) {
    total += class_data[i].attendance;
  }
  return total / class_data.length; // Return number
};

const getAverageGradePercentage = (class_data: Array<DataType>) => {
  let total = 0;
  for (let i = 0; i < class_data.length; i++) {
    total += class_data[i].grade;
  }
  return total / class_data.length;
};

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState("cse-a");

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  // Fetch the class data and in-charge based on selectedClass
  const classData = data_dummy[selectedClass];
  const inCharge = inChargeMapping[selectedClass];

  const gradeDistribution = [
    classData.filter((student) => student.grade >= 90).length, // A
    classData.filter((student) => student.grade >= 80 && student.grade < 90).length, // B
    classData.filter((student) => student.grade >= 70 && student.grade < 80).length, // C
    classData.filter((student) => student.grade >= 60 && student.grade < 70).length, // D
    classData.filter((student) => student.grade >= 50 && student.grade < 60).length, // D
    classData.filter((student) => student.grade < 50).length, // F
  ];

  const attendanceDistribution = [
    classData.filter((student) => student.attendance < 60).length, // <60%
    classData.filter((student) => student.attendance >= 60 && student.attendance < 70).length, // 60-70%
    classData.filter((student) => student.attendance >= 70 && student.attendance < 80).length, // 70-80%
    classData.filter((student) => student.attendance >= 80 && student.attendance < 90).length, // 80-90%
    classData.filter((student) => student.attendance >= 90).length, // 90-100%
  ];

 
  return (
    <PageLayout heading="Dashboard" disable_heading={true}>
      <div className="dashheading">
        <h1 className="dashboard-heading">{selectedClass.toUpperCase()}</h1>
        <p>
          Choose Class:
          <select name="class" id="classes-dropdown" onChange={handleClassChange}>
            <option value="cse-a">CSE-A</option>
            <option value="cse-b">CSE-B</option>
            <option value="cse-c">CSE-C</option>
            <option value="cse-d">CSE-D</option>
          </select>
        </p>
      </div>
      <p>
        <b>In-Charge: </b>{inCharge}
      </p>
      <div className="key-metrics">
        <ProgressCard
          heading="Attendance"
          value={getAttendanceAveragePercentage(classData)}
          positiveAttribute="Attendance"
          negativeAttribute="Absent"
        />
        <ProgressCard
          heading="Average Grade"
          value={getAverageGradePercentage(classData)}
          positiveAttribute="Pass"
          negativeAttribute="Fail"
        />
      </div>
      <div className="charts-section">
        <GradeDistributionPieChart gradeData={gradeDistribution} />
        <AttendanceDistributionBarChart attendanceData={attendanceDistribution} />
      </div>
      
      {/* Students Table goes here */}
      <h2 className="students-heading">Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Attendance</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((student: DataType) => (
            <tr key={student.roll_no}>
              <td>{student.name}</td>
              <td>{student.roll_no}</td>
              <td>{student.attendance}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageLayout>
  );
};

export default Dashboard;

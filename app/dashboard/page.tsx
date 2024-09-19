import { PageLayout } from "../components/layouts/page-layout/PageLayout";
import ProgressCard from "../components/ProgressCard";
import Section from "../components/Section";
import "./dashboard.module.css";

import { data } from "../data/data";
import { DataType } from "../data/data";

const getAttendanceAveragePercentage = (class_data: Array<DataType>) => {
  let total = 0;
  for (let i = 0; i < class_data.length; i++) {
    total += class_data[i].attendance;
  }
  return total / class_data.length;
};

const getAverageGradePercentage = (class_data: Array<DataType>) => {
  let total = 0;
  for (let i = 0; i < class_data.length; i++) {
    total += class_data[i].grade;
  }
  return total / class_data.length;
};

const Dashboard = () => {
  return (
    <PageLayout heading="Dashboard" disable_heading={true}>
      <div className="dashheading">
        <h1 className="dashboard-heading">CSM-A</h1>
        <p>
          Choose Class:
          <select name="class" id="classes-dropdown">
            <option value="csm-a">CSM-A</option>
            <option value="csm-b">CSM-B</option>
            <option value="csm-c">CSM-C</option>
            <option value="csm-d">CSM-D</option>
          </select>
        </p>
      </div>
      <p>
        <b>In-Charge: </b>Dr. Jobs
      </p>
      <div className="key-metrics">
        <ProgressCard
          heading="Attendance"
          value={getAttendanceAveragePercentage(data)}
          positiveAttribute="Attendance"
          negativeAttribute="Absent"
        />
        <ProgressCard
          heading="Average Grade"
          value={getAverageGradePercentage(data)}
          positiveAttribute="Pass"
          negativeAttribute="Fail"
        />
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
          {data.map((student) => (
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

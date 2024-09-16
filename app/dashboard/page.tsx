import { PageLayout } from "../components/layouts/page-layout/PageLayout";
import ProgressCard from "../components/ProgressCard";
import Section from "../components/Section";
import "./dashboard.module.css";

interface DataType {
  name: string;
  roll_no: string;
  attendance: number;
  grade: number;
}

const data: Array<DataType> = [
  {
    name: "Jack",
    roll_no: "598",
    attendance: 72,
    grade: 78,
  },
  {
    name: "Jill",
    roll_no: "599",
    attendance: 82,
    grade: 88,
  },
  {
    name: "John",
    roll_no: "600",
    attendance: 92,
    grade: 98,
  },
  {
    name: "Jane",
    roll_no: "601",
    attendance: 62,
    grade: 68,
  },
  {
    name: "James",
    roll_no: "602",
    attendance: 52,
    grade: 58,
  },
  {
    name: "Jenny",
    roll_no: "603",
    attendance: 42,
    grade: 48,
  },
  {
    name: "Jasmine",
    roll_no: "604",
    attendance: 32,
    grade: 38,
  },
  {
    name: "Jude",
    roll_no: "605",
    attendance: 22,
    grade: 28,
  },
  {
    name: "Jared",
    roll_no: "606",
    attendance: 12,
    grade: 18,
  },
  {
    name: "Jesse",
    roll_no: "607",
    attendance: 2,
    grade: 8,
  },
];

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
      <h1 className="dashboard-heading">CSM-A</h1>
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

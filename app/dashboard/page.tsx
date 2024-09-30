import { BsThreeDots } from "react-icons/bs";
import { PageLayout } from "../components/layouts/page-layout/PageLayout";
import ProgressCard from "../components/ProgressCard";
import "./dashboard.module.css";

const recentItem = [
  {
    itemName: "DBMS Assignment 1",
    status: "Submitted",
    date: "2024-06-12",
  },
  {
    itemName: "DBMS Assignment 2",
    status: "Pending",
    date: "2024-07-10",
  },
  {
    itemName: "OS Assignment 2",
    status: "Submitted",
    date: "2024-07-15",
  },
  {
    itemName: "OS Assignment 1",
    status: "Submitted",
    date: "2024-06-20",
  },
  {
    itemName: "OS Assignment 3",
    status: "Pending",
    date: "2024-08-20",
  },
  {
    itemName: "DBMS Assignment 3",
    status: "Pending",
    date: "2024-08-20",
  },
  {
    itemName: "OS Assignment 4",
    status: "Pending",
    date: "2024-09-25",
  },
  {
    itemName: "DBMS Assignment 4",
    status: "Pending",
    date: "2024-09-25",
  },
  {
    itemName: "OS Assignment 5",
    status: "Pending",
    date: "2024-10-25",
  },
  {
    itemName: "DBMS Assignment 5",
    status: "Pending",
    date: "2024-10-25",
  },
  {
    itemName: "OS Assignment 6",
    status: "Pending",
    date: "2024-11-25",
  },
  {
    itemName: "DBMS Assignment 6",
    status: "Pending",
    date: "2024-11-25",
  },
  {
    itemName: "OS Assignment 7",
    status: "Pending",
    date: "2024-12-25",
  },
  {
    itemName: "DBMS Assignment 7",
    status: "Pending",
    date: "2024-12-25",
  },
  {
    itemName: "OS Assignment 8",
    status: "Pending",
    date: "2025-01-25",
  },
  {
    itemName: "DBMS Assignment 8",
    status: "Pending",
    date: "2025-01-25",
  },
  {
    itemName: "OS Assignment 9",
    status: "Pending",
    date: "2025-02-25",
  },
  {
    itemName: "DBMS Assignment 9",
    status: "Pending",
    date: "2025-02-25",
  },
  {
    itemName: "OS Assignment 10",
    status: "Pending",
    date: "2025-03-25",
  },
  {
    itemName: "DBMS Assignment 10",
    status: "Pending",
    date: "2025-03-25",
  },
];

const Dashboard = () => {
  return (
    <PageLayout heading="Dashboard" disable_heading={true}>
      <h1 className="dashboard-heading">CSE-A</h1>
      <p>
        <b>In-Charge: </b>Dr. Jobs
      </p>
      <div className="key-metrics">
        <IdCard></IdCard>
        <ProgressCard
          heading="Attendance"
          value={72}
          positiveAttribute="Present"
          negativeAttribute="Absent"
        />
      </div>
      <h2 className="students-heading">Recents</h2>
      <div className="recent-items">
        {recentItem.map((item, index) => (
          <Item
            itemName={item.itemName}
            status={item.status}
            date={item.date}
            key={item.date + index}
          />
        ))}
      </div>
    </PageLayout>
  );
};
export default Dashboard;

const IdCard = () => {
  return (
    <div className="id-card">
      <h2>Your ID Card</h2>
      <div className="id-card-content">
        <img src="https://placehold.co/200x200" alt="" className="id-img" />
        <div>
          <h3>Vaishnavi A.</h3>
          <span>Roll.No: 2201</span>
          <br />
          <span>CSE-A</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>4th Year</span>
        </div>
      </div>
    </div>
  );
};

const Item = ({
  itemName,
  status,
  date,
}: {
  itemName: string;
  status: string;
  date: string;
}) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    let month = "";
    switch (d.getMonth()) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sep";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
    }
    return `${d.getDate()} ${month}, ${d.getFullYear()}`;
  };

  return (
    <div className="item">
      <img src="https://via.placeholder.com/64x64" alt="" />
      <p className="item-name">{itemName}</p>
      <span
        className={
          "item-status" +
          ` item-status--${status == "Submitted" ? "done" : "pending"}`
        }
      >
        {status}
      </span>
      <p className="item-date">{formatDate(date)}</p>
      <BsThreeDots></BsThreeDots>
    </div>
  );
};

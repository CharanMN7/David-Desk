// app/authenticated/attendance/page.tsx

'use client';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AttendanceBarChart } from "./AttendanceBarChart";
import styles from "./attendance.module.css"; // Import the CSS module
import Link from "next/link";

const AttendancePage = () => {
  // Branch names
  const branches = ["cse", "csm", "csd", "cso", "csc", "ece", "eee", "mech", "civil"];

  return (
    <ContentLayout title="Attendance">
      {/* Branch Links Section - Placed at the top */}
      <h1>Attendance Dashboard</h1>
      <div className={styles.branchLinksContainer}>
        {branches.map((branch) => (
          <Link href={`/attendance/${branch}`} key={branch} className={styles.branchLink}>
            {branch.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Charts Section - Placed below the branch links */}
      <div className={styles.chartContainer}>
        <AttendanceBarChart />
      </div>
    </ContentLayout>
  );
};

export default AttendancePage;

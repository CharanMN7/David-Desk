'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';  // Correct import from next/navigation
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AttendanceBarChart } from "../AttendanceBarChart";
import styles from "../attendance.module.css"; // Adjust path if needed

const BranchAttendancePage = () => {
  const [branch, setBranch] = useState<string | null>(null); // Branch name state
  const [isClient, setIsClient] = useState(false); // Track if the component is rendered client-side
  const searchParams = useSearchParams(); // Access the query parameters

  // Set the client-side flag after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Once the component has mounted, get the branch name from the URL
  useEffect(() => {
    if (isClient && searchParams) {
      const branchName = searchParams.get('branch'); // Get branch name from query
      if (branchName) {
        setBranch(branchName); // Set the branch name
      }
    }
  }, [isClient, searchParams]);

  // If it's still rendering or branch data isn't available, show loading state
  if (!isClient || !branch) {
    return <div>Loading...</div>;
  }

  return (
    <ContentLayout title={`${branch.toUpperCase()} Attendance`}>
      <h1>Attendance for {branch.toUpperCase()}</h1>
      <div className={styles.chartContainer}>
        {/* Replace this with actual data for the branch */}
        <AttendanceBarChart />
      </div>
    </ContentLayout>
  );
};

export default BranchAttendancePage;

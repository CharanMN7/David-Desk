"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AttendanceBarChart } from "./AttendanceBarChart";

const Page = () => {
  return (
    <ContentLayout title="Attendance">
      <AttendanceBarChart />
    </ContentLayout>
  );
};
export default Page;

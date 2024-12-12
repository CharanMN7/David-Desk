import { ContentLayout } from "@/components/admin-panel/content-layout";
import LeavePageDashboard from "./leaves-page";

const Page = () => {
  return (
    <ContentLayout title="Manage Leaves">
            <LeavePageDashboard/>
    </ContentLayout>
  );
};
export default Page;

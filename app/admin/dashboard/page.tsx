import { ContentLayout } from "@/components/admin-panel/content-layout";
import Dashbaord from "./Dashbaord";
import { DataTableDemo } from "./sample-data";

const Page = () => {
  return (
    <ContentLayout title="Dashboard">
      <Dashbaord />
      <DataTableDemo/>
    </ContentLayout>
  );
};
export default Page;

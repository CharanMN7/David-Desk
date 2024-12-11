import { ContentLayout } from "@/components/admin-panel/content-layout";
import { BarComponent } from "./faculty-attendance";

const Page = () => {
  return <ContentLayout title="Faculty Metrics">
    <BarComponent/>
  </ContentLayout>;
};
export default Page;

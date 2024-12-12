import { ContentLayout } from "@/components/admin-panel/content-layout";
import { BarComponent } from "./faculty-attendance";
import { PieChartComponent } from "./pie-chart";
import { LineChartComponent } from "./line-chart";

const Page = () => {
  return <ContentLayout title="Faculty Metrics">
    <div className="my-6 space-y-4 lg:grid lg:space-y-0 grid-cols-2 gap-4">
    <BarComponent/>
    <PieChartComponent/>
    </div>
    <div>
      <LineChartComponent/>
    </div>
  </ContentLayout>;
};
export default Page;

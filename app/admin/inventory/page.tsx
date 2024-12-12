import { ContentLayout } from "@/components/admin-panel/content-layout";
import ManageInventory from "./manage-inventory";
import InventoryDashboard from "./manage-inventory";
import { PieChartComponent } from "../metrics/teachers/pie-chart";

const Page = () => {
  return (
  <ContentLayout title="Inventory">
      <InventoryDashboard/>

  </ContentLayout>
  );

};
export default Page;

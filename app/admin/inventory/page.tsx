import { ContentLayout } from "@/components/admin-panel/content-layout";
import ManageInventory from "./manage-inventory";
import InventoryDashboard from "./manage-inventory";

const Page = () => {
  return (
  <ContentLayout title="Inventory">
      <InventoryDashboard/>
  </ContentLayout>
  );

};
export default Page;

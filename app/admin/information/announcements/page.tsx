import { ContentLayout } from "@/components/admin-panel/content-layout";
import AnnouncementForm from "./announcement-form";

const Page = () => {
  return <ContentLayout title="Announcements">
    <AnnouncementForm/>
  </ContentLayout>;
};
export default Page;

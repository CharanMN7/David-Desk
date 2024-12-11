import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateUser from "./CreateUser";

const Page = () => {
  return (
    <ContentLayout title="Manage Users">
      <Tabs defaultValue="student">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <CreateUser role="student" />
        </TabsContent>

        <TabsContent value="teacher">
          <CreateUser role="teacher" />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
};
export default Page;

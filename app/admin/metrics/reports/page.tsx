import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentForm from "./StudentForm";
import ClassForm from "./ClassForm";

const Page = () => {
  return (
    <ContentLayout title="Generate Reports">
      <div className="space-y-4">
        <p className="text-muted-foreground">Generate reports for students.</p>
        <Tabs defaultValue="student" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student-wise</TabsTrigger>
            <TabsTrigger value="class">Class-wise</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="border px-8 rounded-md">
            <StudentForm />
          </TabsContent>
          <TabsContent value="class" className="border px-8 rounded-md">
            <ClassForm />
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
};

export default Page;

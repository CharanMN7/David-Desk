import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BranchwiseGrades } from "./grades-components/BranchwiseGrades";
import { YoyBranchwiseGrades } from "./grades-components/YoyBranchwiseGrades";
import { PassFailPercentage } from "./grades-components/PassFailPercentage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchwiseAttendance } from "./attendance-components/BranchwiseAttendance";
import { YoyBranchwiseAttendance } from "./attendance-components/YoyBranchwiseAttendance";

const Page = () => {
  return (
    <ContentLayout title="Student Metrics">
      <Tabs defaultValue="grades">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="grades">
          <div className="flex justify-between border p-4 my-4 rounded-xl">
            <h2 className="text-2xl font-semibold">Grades</h2>
            <Button asChild>
              <Link href="/admin/metrics/students/grades">
                More Actions <ChevronRight />
              </Link>
            </Button>
          </div>
          <div className="my-6 space-y-4 lg:grid lg:space-y-0 grid-cols-2 gap-4">
            <PassFailPercentage />
            <BranchwiseGrades className="h-full" />
            <YoyBranchwiseGrades className="col-span-2" />
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="flex justify-between border p-4 my-4 rounded-xl">
            <h2 className="text-2xl font-semibold">Attendance</h2>
            <Button asChild>
              <Link href="/admin/metrics/students/attendance">
                More Actions <ChevronRight />
              </Link>
            </Button>
          </div>
          <div className="my-6 space-y-4 lg:grid lg:space-y-0 grid-cols-2 gap-4">
            <BranchwiseAttendance />
            <YoyBranchwiseAttendance />
          </div>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
};
export default Page;

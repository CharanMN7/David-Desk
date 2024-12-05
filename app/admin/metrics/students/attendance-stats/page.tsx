import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <ContentLayout title="Faculty Metrics">
      <div className="flex gap-4 items-center">
        <Button size="icon" variant="outline" asChild>
          <Link href="/admin/metrics/students/">
            <ChevronLeft />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">Attendance</h2>
      </div>
      <p className="text-sm text-muted-foreground my-2">
        Create cutom visualizationa and reports for your data.
      </p>
      <div>{/* Content goes here */}</div>
    </ContentLayout>
  );
};
export default Page;

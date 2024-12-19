import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async (props: { params: Promise<{ classroom_id: string }> }) => {
  const params = await props.params;
  const [branch, section, batch] = params.classroom_id.split("_");

  return (
    <ContentLayout
      title={`${branch.toUpperCase()}-${section.toUpperCase()} (${batch})`}
    >
      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <Button size="icon" variant="outline" asChild>
            <Link href="/teacher/classrooms">
              <ChevronLeft />
            </Link>
          </Button>
          <div>
            <h2 className="text-lg">{`${branch.toUpperCase()}-${section.toUpperCase()}`}</h2>
            <p className="text-xs text-muted-foreground">{`(${batch})`}</p>
          </div>
        </div>
        <div></div>
      </div>
    </ContentLayout>
  );
};

export default Page;

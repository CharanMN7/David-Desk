import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = ({ params }: { params: { classroom_id: string } }) => {
  const [branch, section, batch] = params.classroom_id.split("_");

  return (
    <ContentLayout
      title={`${branch.toUpperCase()}-${section.toUpperCase()} (${batch})`}
    >
      <div>
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
      </div>
    </ContentLayout>
  );
};

export default Page;

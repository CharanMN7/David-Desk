import { ContentLayout } from "@/components/admin-panel/content-layout";
import { StudentSideAssignmentsTable } from "@/components/tables/assignments/StudentSideAssigmentsTable";
import {
  StudentSideAssignment,
  studentSideAssignmentColumns,
} from "@/components/tables/assignments/StudentSideAssignmentsTableColumns";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const assignmentsData: StudentSideAssignment[] = [
  {
    id: 1,
    title: "Assignment 1",
    deadline: "2021-10-01",
    status: "Not Started",
  },
  {
    id: 2,
    title: "Assignment 2",
    deadline: "2021-10-02",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Assignment 3",
    deadline: "2021-10-03",
    status: "Completed",
  },
  {
    id: 4,
    title: "Assignment 4",
    deadline: "2021-10-04",
    status: "Not Started",
  },
  {
    id: 5,
    title: "Assignment 5",
    deadline: "2021-10-05",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Assignment 6",
    deadline: "2021-10-06",
    status: "Completed",
  },
  {
    id: 7,
    title: "Assignment 7",
    deadline: "2021-10-07",
    status: "Not Started",
  },
  {
    id: 8,
    title: "Assignment 8",
    deadline: "2021-10-08",
    status: "In Progress",
  },
  {
    id: 9,
    title: "Assignment 9",
    deadline: "2021-10-09",
    status: "Completed",
  },
  {
    id: 10,
    title: "Assignment 10",
    deadline: "2021-10-10",
    status: "Not Started",
  },
  {
    id: 11,
    title: "Assignment 11",
    deadline: "2021-10-11",
    status: "In Progress",
  },
  {
    id: 12,
    title: "Assignment 12",
    deadline: "2021-10-12",
    status: "Completed",
  },
  {
    id: 13,
    title: "Assignment 13",
    deadline: "2021-10-13",
    status: "Not Started",
  },
  {
    id: 14,
    title: "Assignment 14",
    deadline: "2021-10-14",
    status: "In Progress",
  },
  {
    id: 15,
    title: "Assignment 15",
    deadline: "2021-10-15",
    status: "Completed",
  },
  {
    id: 16,
    title: "Assignment 16",
    deadline: "2021-10-16",
    status: "Not Started",
  },
  {
    id: 17,
    title: "Assignment 17",
    deadline: "2021-10-17",
    status: "In Progress",
  },
  {
    id: 18,
    title: "Assignment 18",
    deadline: "2021-10-18",
    status: "Completed",
  },
  {
    id: 19,
    title: "Assignment 19",
    deadline: "2021-10-19",
    status: "Not Started",
  },
  {
    id: 20,
    title: "Assignment 20",
    deadline: "2021-10-20",
    status: "In Progress",
  },
  {
    id: 21,
    title: "Assignment 21",
    deadline: "2021-10-21",
    status: "Completed",
  },
  {
    id: 22,
    title: "Assignment 22",
    deadline: "2021-10-22",
    status: "Not Started",
  },
];

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
        <div>
          <StudentSideAssignmentsTable
            columns={studentSideAssignmentColumns}
            data={assignmentsData}
          />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Page;

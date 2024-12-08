"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ClassroomCard = ({
  branch,
  section,
  batch,
}: {
  branch: string;
  section: string;
  batch: string;
}) => {
  return (
    <Card className="w-fit flex flex-row items-center justify-center">
      <CardHeader>
        <CardTitle>
          {branch.toUpperCase()} - {section.toUpperCase()}
        </CardTitle>
        <CardDescription>{batch}</CardDescription>
      </CardHeader>
      <Button className="mr-6" asChild>
        <Link
          href={`/teacher/classrooms/${branch + "_" + section + "_" + batch}`}
        >
          View
          <ChevronRight />
        </Link>
      </Button>
    </Card>
  );
};
export default ClassroomCard;

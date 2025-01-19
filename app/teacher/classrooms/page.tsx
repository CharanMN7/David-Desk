import { ContentLayout } from "@/components/admin-panel/content-layout";
import ClassroomCard from "./ClassroomCard";

const dummyData = [
  {
    branch: "cse",
    section: "a",
    batch: "2021-2025",
  },
  {
    branch: "ece",
    section: "b",
    batch: "2021-2025",
  },
  {
    branch: "mech",
    section: "c",
    batch: "2021-2025",
  },
  {
    branch: "civil",
    section: "d",
    batch: "2021-2025",
  },
];

const Page = () => {
  return (
    <ContentLayout title="Classrooms">
      <p className="text-muted-foreground">View all your classrooms here:</p>
      <div className="flex flex-wrap gap-4 my-4 justify-center md:justify-start">
        {dummyData.map((data, index) => (
          <ClassroomCard key={index} {...data} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default Page;

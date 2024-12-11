"use client";

import { useState } from "react";
import { SelectTimeTableDemo } from "./select-time-table";
import { TimeTableDemo } from "./sample-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const Page = () => {
  const [selectedBranch, setSelectedBranch] = useState("CSM");

  return (
    <ContentLayout title="TimeTables"> 
    <div className="space-y-6">
      <SelectTimeTableDemo onSelectBranch={setSelectedBranch} />
      {selectedBranch && <TimeTableDemo branch={selectedBranch} />}
    </div>
    </ContentLayout>
  );
};

export default Page;

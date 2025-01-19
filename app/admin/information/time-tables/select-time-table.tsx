"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectTimeTableDemo({ onSelectBranch }: { onSelectBranch: (branch: string) => void }) {
  return (
    <Select onValueChange={onSelectBranch}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Branch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Branches</SelectLabel>
          <SelectItem value="CSM">CSM</SelectItem>
          <SelectItem value="CSD">CSD</SelectItem>
          <SelectItem value="ECE">ECE</SelectItem>
          <SelectItem value="CIVIL">CIVIL</SelectItem>
          <SelectItem value="MECH">MECH</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}


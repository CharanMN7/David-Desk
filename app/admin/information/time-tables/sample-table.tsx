"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimetableData {
  day: string;
  classes: {
    time: string;
    subject_name: string;
    teacher_name: string;
    room: string;
  }[];
}

export function TimeTableDemo({ branch }: { branch: string }) {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const times = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  useEffect(() => {
    if (!branch) return;

    fetch(`https://david-backend-production.up.railway.app/timetable/${branch}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setTimetables(data.timetables);
        }
      })
      .catch((error) => {
        console.error("Error fetching timetable data:", error);
      });
  }, [branch]);

  return (
    <TooltipProvider>
      <Table className="border rounded-md">
        <TableCaption>Weekly Timetable for {branch}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Day</TableHead>
            {times.map((time) => (
              <TableHead key={time} className="">
                {time}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timetables.length === 0 ? (
            <TableRow>
              <TableCell colSpan={times.length + 1} className="">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            days.map((day) => (
              <TableRow key={day}>
                <TableCell className=" font-semibold">{day}</TableCell>
                {times.map((timeSlot) => {
                  const classData = timetables
                    .find(
                      (dayData) =>
                        dayData.day.toLowerCase() === day.toLowerCase(),
                    )
                    ?.classes.find((classData) => classData.time === timeSlot);
                  return (
                    <TableCell key={timeSlot} className="">
                      {classData ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <div className="font-medium">
                                {classData.subject_name}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg">
                            <p>Teacher: {classData.teacher_name || "N/A"}</p>
                            <p>Room: {classData.room}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}

import { NextResponse } from "next/server";

const data = [
  { branch: "CSE", attendance_percentage: 90 },
  { branch: "ECE", attendance_percentage: 85 },
  { branch: "EEE", attendance_percentage: 70 },
  { branch: "MECH", attendance_percentage: 65 },
  { branch: "CIVIL", attendance_percentage: 91 },
  { branch: "IT", attendance_percentage: 89 },
];

export async function GET(): Promise<Response> {
  return NextResponse.json({ data });
}

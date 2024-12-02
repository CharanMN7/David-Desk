'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SectionAttendanceData {
  section: string;
  present: number;
  absent: number;
  percentage: number;
}

interface SectionAttendanceChartProps {
  data: SectionAttendanceData[];
}

export const SectionAttendanceChart: React.FC<SectionAttendanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="section" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill="#82ca9d" name="Present Students" />
        <Bar dataKey="absent" fill="#8884d8" name="Absent Students" />
      </BarChart>
    </ResponsiveContainer>
  );
};

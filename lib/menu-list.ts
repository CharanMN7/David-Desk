/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  BarChartBig,
  Group,
  Calendar,
  MessageCircleQuestion,
  Info,
  Box,
  Bot,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { Label } from "recharts";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, userRole: string): Group[] {
  const adminMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "#",
          label: "Metrics",
          icon: BarChartBig,
          submenus: [
            {
              href: "/admin/metrics/students",
              label: "Students",
              icon: Group,
            },
            {
              href: "/admin/metrics/teachers",
              label: "Teachers",
              icon: Group,
            },
            {
              href: "/admin/metrics/reports",
              label: "Reports",
              icon: Bookmark,
            },
          ],
        },
        {
          href: "#",
          label: "Information",
          icon: Info,
          submenus: [
            {
              href: "/admin/information/announcements",
              label: "Announcements",
              icon: MessageCircleQuestion,
            },
            {
              href: "/admin/information/time-tables",
              label: "Time Tables",
              icon: Calendar,
            },
          ],
        },
        {
          href: "/admin/inventory",
          label: "Inventory",
          icon: Box,
          submenus: [],
        },
        {
          href: "/admin/manage",
          label: "Manage",
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];

  const teacherMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/teacher/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/teacher/classrooms",
          label: "Classrooms",
          icon: Tag,
          submenus: [],
        },
        {
          href: "/teacher/announcements",
          label: "Announcements",
          icon: MessageCircleQuestion,
          submenus: [],
        },
      ],
    },
  ];

  const studentMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/student/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/student/classroom",
          label: "Classroom",
          icon: Tag,
          submenus: [],
        },
        {
          href: "/student/david",
          label: "David",
          icon: Bot,
          submenus: [],
        },
        {
          href: "/student/quiz",
          label: "Quiz",
          icon: MessageCircleQuestionIcon,
          submenus: [],
        },
        ,
        {
          href: "/student/announcements",
          label: "Announcements",
          icon: MessageCircleQuestion,
          submenus: [],
        },
      ],
    },
  ];

  if (userRole === "admin") {
    return adminMenuList;
  } else if (userRole === "teacher") {
    return teacherMenuList;
  } else if (userRole === "student") {
    return studentMenuList;
  }
  return [];
}

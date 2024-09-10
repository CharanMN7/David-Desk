"use client";
import {
  Cog,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Notebook,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface PageRouteData {
  route: string;
  icon: React.ReactNode;
  label: string;
}

const pages: PageRouteData[] = [
  {
    route: "/dashboard",
    icon: <LayoutDashboard className="sidebar-btn-icon" />,
    label: "Dashboard",
  },
  {
    route: "/notes",
    icon: <Notebook className="sidebar-btn-icon" />,
    label: "Notes",
  },
  {
    route: "/chat",
    icon: <MessageSquare className="sidebar-btn-icon" />,
    label: "Chat",
  },
  {
    route: "/assignments",
    icon: <StickyNote className="sidebar-btn-icon" />,
    label: "Assignments",
  },
  {
    route: "/todo",
    icon: <ListChecks className="sidebar-btn-icon" />,
    label: "To Do",
  },
];

export const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="sidebar">
      <div className="sidebar-main">
        {pages.map((page, index) => (
          <Link
            key={page.route + index}
            href={page.route}
            className={`sidebar-btn ${
              path.includes(page.label.toLowerCase())
                ? "sidebar-btn-active"
                : ""
            }`}
          >
            {page.icon}
            <span>{page.label}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-bottom">
        <Link
          href="/settings"
          className={`sidebar-btn ${
            path.includes("settings") ? "sidebar-btn-active" : ""
          }`}
        >
          <Cog className="sidebar-btn-icon" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

"use client";
import {
  Cog,
  FlaskConical,
  LayoutDashboard,
  Package,
  ShoppingCart,
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
    route: "/inventory",
    icon: <Package className="sidebar-btn-icon" />,
    label: "Inventory",
  },
  {
    route: "/all-labs",
    icon: <FlaskConical className="sidebar-btn-icon" />,
    label: "All Labs",
  },
  {
    route: "/orders",
    icon: <ShoppingCart className="sidebar-btn-icon" />,
    label: "Orders",
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
              path.includes(page.label.toLowerCase()) ||
              path.includes(page.label.toLowerCase().split(" ")[1])
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
          href=""
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
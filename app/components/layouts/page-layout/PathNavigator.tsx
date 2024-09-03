"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PathNavigator = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const currentPath = paths[paths.length - 1];
  return (
    <div className="nav-paths">
      {paths.map((path, index) => (
        <>
          {path === currentPath ? (
            <span className="active-path">{path}</span>
          ) : (
            <Link
              key={index}
              href={`http://localhost:3000/${paths
                .slice(0, index + 1)
                .join("/")}`}
              className={`path-nav-item ${
                path === currentPath && "active-path"
              }`}
            >
              {path}
            </Link>
          )}

          {index < paths.length - 1 && index !== 0 ? (
            <ChevronRight className="path-nav-icon" />
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
};

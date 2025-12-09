"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid = "1234" }: { cid?: string }) {
  const pathname = usePathname(); // get current path

  const LABELS = [
    "Home",
    "Modules",
    "Pazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const links = LABELS.map((label) => {
    //if (label === "Piazza") return { href: "https://piazza.com/home", label }; for project
    if (label === "Zoom") return { href: "https://www.zoom.com/", label };
    if (label === "People")
      return { href: `/Courses/${encodeURIComponent(cid)}/People/Table`, label };
    return { href: `/Courses/${encodeURIComponent(cid)}/${label}`, label };
  });

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        // active detection: exact match or startsWith (so subroutes still highlight)
        const normalizedPath = (pathname ?? "").replace(/\/+$/g, "");
        const normalizedHref = link.href.replace(/\/+$/g, "");
        const active =
          !isExternal &&
          (normalizedPath === normalizedHref ||
            normalizedPath.startsWith(normalizedHref + "/") ||
            normalizedPath.includes(link.label));

        const className = `list-group-item border-0 ${active ? "active" : "text-danger"}`;

        if (isExternal) {
          // preserve original visual style but render external <a>
          return (
            <a key={link.href} href={link.href} className={className} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          );
        }

        return (
          <Link key={link.href} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname(); // get current path

  const links = [
    { href: "/Courses/1234/Home", label: "Home" },
    { href: "/Courses/1234/Modules", label: "Modules" },
    { href: "https://piazza.com/home", label: "Piazza" },
    { href: "https://www.zoom.com/", label: "Zoom" },
    { href: "/Courses/1234/Assignments", label: "Assignments" },
    { href: "/Courses/1234/Quizzes", label: "Quizzes" },
    { href: "/Courses/1234/People/Table", label: "People" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item border-0 ${
            pathname === link.href ? "active" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}


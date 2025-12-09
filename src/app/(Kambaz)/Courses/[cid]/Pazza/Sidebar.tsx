"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Sidebar() {
  const links = ["Q&A", "Manage class", "Resources", "Announcements"];
  const pathname = usePathname();

  
  const parts = pathname.split("/");
  const courseId = parts[2] || "1234";

  const buildHref = (name: string) =>
    `/Courses/${courseId}/Pazza/${name.replace(" ", "")}`;

  const isActive = (name: string) => pathname.includes(name);
  const logoSrc = "/images/piazza.jpg"; // Path to your logo image

  return (
    <div className="wd-sidebar-header-container">
    <Image
        src={logoSrc}
        alt="Pazza Course Logo"
        width={100} // Set the width (in pixels)
        height={40} // Set the height (in pixels)
        className="wd-sidebar-logo"
      />
    <nav id="wd-courses-pazza-navigation" className="wd-courses-pazza-nav">
        
      {links.map((name) => {
        const href = buildHref(name);
        const id = `wd-course-pazza-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}-link`;

        return (
          <Link
            key={name}
            href={ href }
            id={id}
            className={`wd-course-pazza-link ${isActive(name) ? "active" : ""}`}
          >
            {name}
          </Link>
        );
      })}
    </nav>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "Signin", label: "Signin" },
    { href: "Signup", label: "Signup" },
    { href: "Profile", label: "Profile" },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.endsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            id={`wd-account-${link.label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive
                ? "active border-start border-3 border-dark"
                : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

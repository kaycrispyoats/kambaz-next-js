"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function KambazNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  const mainlinks = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, key: "dashboard" },
    { label: "Courses",   path: "/Dashboard", icon: LiaBookSolid, key: "courses" },
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline, key: "calendar" },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox, key: "inbox" },
    { label: "Labs",      path: "/Labs",      icon: LiaCogSolid, key: "labs" },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black ${
          pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </ListGroupItem>

      {mainlinks.map((link) => (
        <ListGroupItem
          key={link.key}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0 ${
            pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"
          }`}
        >
          <link.icon className="fs-1 text-danger" />
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
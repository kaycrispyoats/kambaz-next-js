"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
// Determine if a link is active
  const isActive = (href: string) => pathname?.startsWith(href);

  // Helper to get ListGroupItem classes
  const getItemClasses = (href: string) =>
    `border-0 text-center ${isActive(href) ? "bg-white" : "bg-black"}`;

  // Helper to get Link classes
  const getLinkClasses = (href: string) =>
    `text-decoration-none ${isActive(href) ? "text-danger" : "text-white"}`;
  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 110 }}
    id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
 target="_blank"href="https://www.northeastern.edu/" id="wd-neu-link">
  <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
  </ListGroupItem>
  <ListGroupItem className={getItemClasses("/Account")}>
<Link href="/Account" id="wd-account-link" className={getLinkClasses("/Account")}>
         <FaRegCircleUser
  className="fs-1"
  style={{ color: isActive("/Account") ? "gray" : "white" }}
/>
<br />
          Account 
          </Link>
          </ListGroupItem>
      <ListGroupItem className={getItemClasses("/Dashboard")}>
      <Link href="/Dashboard" id="wd-dashboard-link" className={getLinkClasses("/Dashboard")}>
      <AiOutlineDashboard className="fs-1 text-danger" />
         <br />
          Dashboard
          </Link>
          </ListGroupItem>
    <ListGroupItem
  className="border-0 text-center"
  style={{ backgroundColor: isActive("/Courses/Modules") ? "white" : "black" }}
>
  <Link
    href="/Courses/Modules"
    id="wd-course-link"
    className="text-decoration-none text-danger"
  >
    <LiaBookSolid className="fs-1 text-danger" />
    <br />
    Courses
  </Link>
</ListGroupItem>

      <ListGroupItem className={getItemClasses("/Calendar")}>
      <Link href="/Calendar" id="wd-calendar-link" className={getLinkClasses("/Calendar")}>
      <IoCalendarOutline className="fs-1 text-danger" />
          <br />
            Calendar 
            </Link>
            </ListGroupItem>
      <ListGroupItem className={getItemClasses("/Inbox")}>
      <Link href="/Inbox" id="wd-inbox-link" className={getLinkClasses("/Inbox")}>
      <FaInbox className="fs-1 text-danger" />
          <br />
            Inbox 
            </Link>
            </ListGroupItem>
      <ListGroupItem className={getItemClasses("/Labs")}>
      <Link href="/Labs" id="wd-labs-link" className={getLinkClasses("/Labs")}>
      <LiaCogSolid className="fs-1 text-danger" />
          <br />
            Labs 
            </Link>
            </ListGroupItem>
    </ListGroup>
  );}

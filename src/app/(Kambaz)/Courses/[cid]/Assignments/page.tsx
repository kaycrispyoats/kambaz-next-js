"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import ControlButtons from "./ModuleControlButtons";
import SearchBar from "./SearchBar";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../../styles.css";
import GreenCheckmark from "../Modules/GreenCheckmark";
import Link from "next/link";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments || [];

  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div>
      <SearchBar />
      <ControlButtons />
      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {/* Header */}
        <ListGroupItem className="wd-module p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className=" me-2 fs-3" />
            <IoMdArrowDropdown className=" me-2 fs-3" />
            Assignments
            <div className="float-end me-2 d-flex align-items-center gap-3">
              <button className="btn btn-secondary rounded-pill bg-light text-dark">
                40% Of Total
              </button>
              <FaPlusCircle className="text-dark fs-4" />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
          </div>
        </ListGroupItem>

        {/* Assignments */}
        {courseAssignments.length === 0 ? (
          <ListGroupItem className="p-3">No assignments found for this course.</ListGroupItem>
        ) : (
          courseAssignments.map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="d-flex justify-content-between align-items-center wd-assignment-list-item"
            >
              <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
                <SlNote className="me-2 fs-4 text-secondary" />
                <div className="wd-assignment-text">
                  <Link
                    href={assignment.href || `/Courses/${cid}/Assignments/${assignment._id}`}
                    className="d-block text-decoration-none fw-bold text-dark"
                  >
                    <h5 className="m-0">{assignment.title}</h5>
                  </Link>
                  <small>
                    <span dangerouslySetInnerHTML={{ __html: assignment.details }} />
                  </small>
                </div>
              </div>

              <div className="float end justify-content-center d-flex align-items-center gap-3">
                {<GreenCheckmark />}
                <IoEllipsisVertical className="text-dark fs-4" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}

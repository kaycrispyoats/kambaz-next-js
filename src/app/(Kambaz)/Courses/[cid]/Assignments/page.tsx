"use client";
import ControlButtons from "./ModuleControlButtons";
import SearchBar from "./SearchBar";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsGripVertical, BsTrash } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../../styles.css";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useState } from "react";
import { deleteAssignment } from "./reducer";
import Link from "next/link";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const assignmentslist = assignments.filter((a) => a.course === cid);

  const [showModal, setShowModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowModal(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setAssignmentToDelete(null);
  };

  return (
    <div>
      <SearchBar />
      {isFaculty && (
        <>
          <ControlButtons />
          <br /><br /><br />
        </>
      )}
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className=" me-2 fs-3" /> <IoMdArrowDropdown className=" me-2 fs-3" />Assignments
            <div className="float-end me-2 d-flex align-items-center gap-3">
              <button className="btn btn-secondary rounded-pill bg-light text-dark">40% Of Total</button>
              <FaPlusCircle className="text-dark fs-4"
               />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
          </div>
        </ListGroupItem>

        {assignmentslist.map((assignment) => (
          <ListGroupItem
            key={assignment._id}
            className="d-flex justify-content-between align-items-center wd-assignment-list-item"
          >
            {/* Text content */}
            <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
              {/* Icon */}
              <SlNote className="me-2 fs-4 text-secondary" />

              <div className="wd-assignment-text">
                <div className="wd-assignment-text">
              {
                 <Link
                      href={`./Assignments/${assignment._id}`}
                      className="d-flex align-items-start flex-grow-1 wd-assignment-text text-decoration-none text-dark"
                  >
                    <span className="fw-bold"><h5>{assignment.title}</h5></span>
                      
                  </Link>
              }
                <small>
                  Multiple Modules | <b>Not Available until  </b> {assignment.availableDate} |{" "}
                  <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                </small>
              </div>
            </div>
            </div>

            {/* Icons */}
            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />

              {/* TRASH ICON (replaces the Delete button) */}
              {isFaculty && (
                <BsTrash
                  className="text-danger fs-5 cursor-pointer"
                  title="Delete assignment"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click handlers
                    handleDeleteClick(assignment._id);
                  }}
                />
              )}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

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
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { setAssignments, deleteAssignment as deleteAssignmentAction } from "./reducer";
import * as client from "../../client";
import Link from "next/link";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const dispatch = useDispatch();
  const router = useRouter();

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  // note: we'll keep assignments Redux synced with server; filter by courseId here
  const assignmentslist = assignments.filter((a) => a.course === courseId);

  const [showModal, setShowModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  // fetch assignments for the course from server and store in Redux
  const fetchAssignments = async () => {
    if (!courseId) return;
    try {
      const data = await client.findAssignmentsForCourse(courseId);
      dispatch(setAssignments(data)); // setAssignments should replace assignments array
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!assignmentToDelete) return;
    try {
      await client.deleteAssignment(assignmentToDelete);
      // update Redux (you also had an action called deleteAssignment; ensure consistency)
      dispatch(deleteAssignmentAction(assignmentToDelete));
      // alternatively: refresh from server: await fetchAssignments();
    } catch (err) {
      console.error("Failed to delete assignment:", err);
      alert("Delete failed — check console");
    } finally {
      setShowModal(false);
      setAssignmentToDelete(null);
    }
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
            <BsGripVertical className=" me-2 fs-3" /> <IoMdArrowDropdown className=" me-2 fs-3" />
            Assignments
            <div className="float-end me-2 d-flex align-items-center gap-3">
              <button className="btn btn-secondary rounded-pill bg-light text-dark">40% Of Total</button>

              {/* Link to assignment creation page */}
              {isFaculty ? (
                <Link href={`/Courses/${courseId}/Assignments/new`} className="text-dark">
                  <FaPlusCircle className="text-dark fs-4" />
                </Link>
              ) : (
                <FaPlusCircle className="text-muted fs-4" />
              )}

              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
          </div>
        </ListGroupItem>

        {assignmentslist.map((assignment) => (
          <ListGroupItem
            key={assignment._id}
            className="d-flex justify-content-between align-items-center wd-assignment-list-item"
          >
            <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
              <SlNote className="me-2 fs-4 text-secondary" />

              <div className="wd-assignment-text">
                <Link
                  href={`/Courses/${courseId}/Assignments/${assignment._id}`}
                  className="d-flex align-items-start flex-grow-1 wd-assignment-text text-decoration-none text-dark"
                >
                  <span className="fw-bold"><h5>{assignment.title}</h5></span>
                </Link>

                <small>
                  Multiple Modules | <b>Not Available until </b> {assignment.availableDate || "—"} |{" "}
                  <b>Due</b> {assignment.dueDate || "—"} | {assignment.points ?? 0} pts
                </small>
              </div>
            </div>

            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />

              {isFaculty && (
                <BsTrash
                  className="text-danger fs-5 cursor-pointer"
                  title="Delete assignment"
                  onClick={(e) => {
                    e.stopPropagation();
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
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

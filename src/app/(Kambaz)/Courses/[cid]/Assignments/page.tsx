import ControlButtons from "./ModuleControlButtons";
import SearchBar from "./SearchBar";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPencil, BsTrash } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../../styles.css";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function Assignments() {
  return (
    <div>
      <SearchBar />
      <ControlButtons /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-1 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className=" me-2 fs-3" /> <IoMdArrowDropdown className=" me-2 fs-3" />Assignments
            <div className="float-end me-2 d-flex align-items-center gap-3">
                  <button className="btn btn-secondary rounded-pill bg-light text-dark">40% Of Total</button>
                  <FaPlusCircle className="text-dark fs-4" />
                  <IoEllipsisVertical className="text-dark fs-4" />
            </div>
 
          </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center wd-assignment-list-item">
          <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
            <SlNote className="me-2 fs-4 text-secondary" />
 
            <div className="wd-assignment-text">
              <span className="fw-bold"><h5>A1</h5></span>{" "}
              <small>
                Multiple Modules | <b>Not Available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
              </small>
            </div>
          </div>
 
            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center wd-assignment-list-item">
          <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
            <SlNote className="me-2 fs-4 text-secondary" />
 
            <div className="wd-assignment-text">
              <span className="fw-bold"><h5>A2</h5></span>{" "}
              <small>
                Multiple Modules | <b>Not Available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
              </small>
            </div>
          </div>
 
            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center wd-assignment-list-item">
          <div className="d-flex align-items-start flex-grow-1 wd-assignment-text">
            <SlNote className="me-2 fs-4 text-secondary" />
 
            <div className="wd-assignment-text">
              <span className="fw-bold"><h5>A3</h5></span>{" "}
              <small>
                Multiple Modules | <b>Not Available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
              </small>
            </div>
          </div>
 
            <div className="float end justify-content-center d-flex align-items-center gap-3">
              <GreenCheckmark />
              <IoEllipsisVertical className="text-dark fs-4" />
            </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
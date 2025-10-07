"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./LessonControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {/* Week 1 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" /> Week 1
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> Introduction to the course
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* Week 2 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" /> Week 2
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> Full Stack Developer - Chapter 1 - Introduciton
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" /> Full Stack Developer - Chapter 2 - Creating User
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

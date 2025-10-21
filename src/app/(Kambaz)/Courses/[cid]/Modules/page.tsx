"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./LessonControlButtons";
import LessonControlButtons from "./LessonControlButtons";

// Define types for lessons and modules
type Lesson = {
  _id: string;
  name: string;
};

type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams();

  // Type-safe modules
  const modules: Module[] = db.modules as Module[];

  return (
    <div>
      <ModulesControls />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroupItem
              key={module._id} // unique key for each module
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> {module.name}
                </div>
                <ModuleControlButtons />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id} // unique key for each lesson
                      className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      </div>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}

import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
 
export default function ModuleControlButtons() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn" href ="./Assignments/123">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
        </Button>
        <button id="wd-view-progress" className="float-end me-2 btn btn-secondary btn-lg">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
        </button>
     </div>);}
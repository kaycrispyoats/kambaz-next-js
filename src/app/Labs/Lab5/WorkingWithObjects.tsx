"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  })
    const [module, setModule] = useState({
     id: 2, name: "SOnic Sez",
  description: "That's no good!",
  course: "Safety 101",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <a id="wd-update-assignment-score"
   className="btn btn-primary float-end"
   href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
  Update Score
</a>

<FormControl
  className="w-75"
  id="wd-assignment-score"
  defaultValue={assignment.score}
  type="number"
  onChange={(e) =>
    setAssignment({ ...assignment, score: Number(e.target.value) })
  }
/>
<a id="wd-update-assignment-status"
   className="btn btn-primary float-end"
   href={`${ASSIGNMENT_API_URL}/status/${assignment.completed}`}>
  Update Completion Status
</a>

<input
  type="checkbox"
  id="wd-assignment-status"
  className="form-check-input w-5"
  checked={assignment.completed}
  onChange={(e) =>
    setAssignment({ ...assignment, completed: e.target.checked })
  }
/>

<label htmlFor="wd-assignment-status" className="form-check-label ms-2">
  {assignment.completed ? "Completed" : "Not Completed"}
</label>

<hr />
      <h4>Retrieving Modules</h4>
      <a id="wd-retrieve-modules" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
      </a><hr/>
      <h4>Retrieving Module Names</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Name
      </a><hr/>

        <h4>Modifying Module</h4>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name</a>
      <FormControl className="w-75" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Description </a>
      <FormControl className="w-60" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr />

    </div>
);}

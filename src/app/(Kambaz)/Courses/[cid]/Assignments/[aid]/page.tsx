"use client";
import { Form, FormLabel, Row, Col, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setAssignments, addAssignment as addAssignmentAction, updateAssignment as updateAssignmentAction } from "../../Assignments/reducer";
import * as client from "../../../client";

type AssignmentFormState = {
  _id?: string;
  title: string;
  description: string;
  points: string;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  course: string;
};

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid ?? "";
  const assignmentId = aid;
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  // fetch existing from Redux (might be empty until we fetch)
  const existing = assignments.find((a) => a._id === assignmentId);

  // local form state
  const [assignment, setAssignment] = useState<AssignmentFormState>({
    title: "",
    description: "",
    points: "100",
    dueDate: "",
    availableDate: "",
    untilDate: "",
    course: courseId,
  });

  // fetch assignments for course when editing/new to make sure Redux has current data
  useEffect(() => {
    const fetch = async () => {
      if (!courseId) return;
      try {
        const data = await client.findAssignmentsForCourse(courseId);
        dispatch(setAssignments(data));
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  

  // when Redux assignments are loaded, populate the form for edit
  useEffect(() => {
    if (existing) {
      setAssignment({
        _id: existing._id,
        title: existing.title ?? "",
        description: existing.description ?? "",
        points: existing.points?.toString() ?? "100",
        dueDate: existing.dueDate ?? "",
        availableDate: existing.availableDate ?? "",
        untilDate: existing.untilDate ?? "",
        course: existing.course,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existing]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: assignment.title,
        description: assignment.description,
        points: parseInt(assignment.points) || 0,
        dueDate: assignment.dueDate,
        availableDate: assignment.availableDate,
        untilDate: assignment.untilDate,
        course: courseId,
      };

      if (assignment._id) {
        // update
        const updated = await client.updateAssignment(assignment._id, payload);
        dispatch(updateAssignmentAction(updated));
      } else {
        // create
        const created = await client.createAssignmentForCourse(courseId, payload);
        dispatch(addAssignmentAction(created));
      }

      // navigate back to assignments list
      router.push(`/Courses/${courseId}/Assignments`);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed — check console");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form onSubmit={handleSave}>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          type="text"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          placeholder="Assignment Title"
        />
        <br />
        <FormControl
          as="textarea"
          rows={4}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          placeholder="Enter assignment details"
        />
        <br />

        <Row className="mb-3 align-items-center">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Points</FormLabel>
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              type="text"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: (parseInt(e.target.value) || 0).toString() })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Due Date</FormLabel>
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              type="datetime-local"
              value={assignment.dueDate}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col xs={12} md={6}>
            <FormLabel>Available From</FormLabel>
            <FormControl
              type="date"
              value={assignment.availableDate}
              onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
            />
          </Col>
          <Col xs={12} md={6}>
            <FormLabel>Until</FormLabel>
            <FormControl
              type="date"
              value={assignment.untilDate}
              onChange={(e) => setAssignment({ ...assignment, untilDate: e.target.value })}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button type="submit" variant="danger" className="me-2">Save</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

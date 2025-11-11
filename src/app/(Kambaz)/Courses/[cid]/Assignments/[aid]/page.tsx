"use client";
import { Form, FormLabel, Row, Col, FormControl, FormSelect, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment, Assignment } from "../../Assignments/reducer";

// Form state: everything is string (for inputs), except optional _id
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existing = assignments.find((a) => a._id === aid);

  // Initialize form state
  const [assignment, setAssignment] = useState<AssignmentFormState>(
    existing
      ? {
          _id: existing._id,
          title: existing.title ?? "",
          description: existing.description ?? "",
          points: existing.points?.toString() ?? "100",
          dueDate: existing.dueDate ?? "",
          availableDate: existing.availableDate ?? "",
          untilDate: existing.untilDate ?? "",
          course: existing.course,
        }
      : {
          title: "",
          description: "",
          points: "100",
          dueDate: "",
          availableDate: "",
          untilDate: "",
          course: courseId,
        }
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert points back to number for Redux
    const payload: Assignment = {
      _id: assignment._id ?? "", // new assignments will get _id in reducer
      title: assignment.title,
      description: assignment.description,
      points: parseInt(assignment.points) || 0,
      dueDate: assignment.dueDate,
      availableDate: assignment.availableDate,
      untilDate: assignment.untilDate,
      course: assignment.course,
      completed: existing?.completed ?? false,
      details: ""
    };

    if (existing) {
      dispatch(updateAssignment(payload));
    } else {
      dispatch(addAssignment(payload));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form>
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

        {/* Assign other fields as before */}
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
          <Button variant="danger" className="me-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

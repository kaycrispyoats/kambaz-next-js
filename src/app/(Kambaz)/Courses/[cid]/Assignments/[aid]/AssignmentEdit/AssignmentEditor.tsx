"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { updateAssignment, Assignment } from "../../reducer";
import { Form, FormLabel, FormControl, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const assignment = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find((a) => a._id === aid)
  ) as Assignment | undefined;

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [points, setPoints] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title ?? "");
      setDetails(assignment.details ?? "");
      setPoints(assignment.points !== undefined ? Number(assignment.points) : "");
      setDueDate(assignment.dueDate ?? "");
      setAvailableFrom(assignment.availableFrom ?? "");
      setAvailableUntil(assignment.availableUntil ?? "");
    }
  }, [assignment]);

  const handleSave = () => {
    if (!assignment) return;
    dispatch(updateAssignment({
      ...assignment,
      title,
      details,
      points: points === "" ? undefined : Number(points),
      dueDate,
      availableFrom,
      availableUntil,
    }));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!assignment) return <div>Assignment not found.</div>;

  return (
    <div className="p-4">
      <h3>Edit Assignment</h3>
      <Form>
        <FormLabel>Title</FormLabel>
        <FormControl value={title} onChange={(e) => setTitle(e.target.value)} />

        <FormLabel className="mt-3">Details</FormLabel>
        <FormControl
          as="textarea"
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <Row className="mt-3">
          <Col>
            <FormLabel>Points</FormLabel>
            <FormControl
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
          <Col>
            <FormLabel>Due Date</FormLabel>
            <FormControl type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <FormLabel>Available From</FormLabel>
            <FormControl type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
          </Col>
          <Col>
            <FormLabel>Available Until</FormLabel>
            <FormControl type="date" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
          </Col>
        </Row>

        <div className="mt-4 d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
}

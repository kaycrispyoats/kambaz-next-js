"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateAssignment, Assignment } from "../../reducer";
import * as client from "../../../../client"; // ADD THIS
import { Form, FormLabel, FormControl, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignmentId = Array.isArray(aid) ? aid[0] : aid;
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  
  const router = useRouter();
  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [points, setPoints] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // Fetch assignment from database
  useEffect(() => {
    const fetchAssignment = async () => {
      console.log("🔍 aid param:", aid);
      console.log("🔍 assignmentId:", assignmentId);
      
      if (!assignmentId) {
        console.log("❌ No assignmentId!");
        setLoading(false);
        return;
      }
      
      try {
        console.log("📝 Fetching assignment:", assignmentId);
        const data = await client.findAssignmentById(assignmentId);
        console.log("📝 Assignment fetched:", data);
        setAssignment(data);
        
        // Populate form
        setTitle(data.title ?? "");
        setDetails(data.details ?? "");
        setPoints(data.points !== undefined ? Number(data.points) : "");
        setDueDate(data.dueDate ?? "");
        setAvailableFrom(data.availableFrom ?? "");
        setAvailableUntil(data.availableUntil ?? "");
      } catch (err) {
        console.error("❌ Failed to fetch assignment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [aid, assignmentId]);
  

  const handleSave = async () => {
    if (!assignment || !assignmentId) return;
    
    try {
      const updatedAssignment = {
        ...assignment,
        title,
        details,
        points: points === "" ? undefined : Number(points),
        dueDate,
        availableFrom,
        availableUntil,
      };
      
      await client.updateAssignment(assignmentId, updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
      
      router.push(`/Courses/${courseId}/Assignments`);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Assignment not found.</div>;

  return (
    <div className="p-4">
      <h3>Edit Assignment: {title}</h3>
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
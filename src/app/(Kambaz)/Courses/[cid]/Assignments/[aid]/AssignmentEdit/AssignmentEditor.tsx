"use client";
import { Form, FormLabel, FormGroup, FormSelect, Row, Col, FormControl } from 'react-bootstrap';
import { assignments } from '../../../../../Database';

import "../../../../styles.css";
import { useParams } from 'next/navigation';
import Link from 'next/link';
export default function AssignmentPage() {
  const { cid,aid } = useParams();
 
  const assignment = assignments.find(a=> a._id===aid );
  
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl type="textarea" 
            defaultValue={assignment?.title}
            placeholder="A1" />
      <br />
      <div
        className="form-control p-3"
        id="assignmentDescription"
        contentEditable
        suppressContentEditableWarning={true}
      >
        The assignment is <span className="text-danger">available online</span>.
        <br /><br />
        Submit a link to the landing page of your Web application running on Netlify.
        <br /><br />
        The landing page should include the following:
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kanbas application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        The Kanbas application should include a link to navigate back to the landing page.
      </div>
      <br></br>
      <div id="wd-assignments-editor" className="container p-4">
      <Form>
        {/* POINTS */}
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Points</FormLabel>
          </Col>
          <Col xs={12} md={8}>
            <FormControl type="text" defaultValue={assignment?.points} />
          </Col>
        </Row>

        {/* ASSIGNMENT GROUP */}
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Assignment Group</FormLabel>
          </Col>
          <Col xs={12} md={8}>
            <FormSelect>
              <option value="0" defaultChecked>ASSIGNMENTS</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormSelect>
          </Col>
        </Row>

        {/* DISPLAY GRADE AS */}
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Display Grade as</FormLabel>
          </Col>
          <Col xs={12} md={8}>
            <FormSelect>
              <option value="percentage" defaultChecked>Percentage</option>
              <option value="points">Points</option>
            </FormSelect>
          </Col>
        </Row>

        {/* SUBMISSION TYPE */}
        <Row className="mb-3 align-items-top">
          <Col xs={12} md={4} className="text-md-end text-start">
            <FormLabel>Submission Type</FormLabel>
          </Col>
          <Col xs={12} md={8}>
           <div className="container p-4 border rounded">
            <FormSelect className="mb-3">
              <option value="online" defaultChecked>Online</option>
              <option value="paper">On Paper</option>
            </FormSelect>
            
              <div className="fw-semibold mb-3">Online Entry Options</div>
              <div className="d-flex flex-column gap-2">
              
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
              <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />  
              <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
              <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
              </div>
            </div>
          </Col>
        </Row>
        
        {/*Assign*/}
        
        <Row className="mb-3 align-items-start">
      <Col xs={12} md={4} className="text-md-end text-start">
        <FormLabel>Assign</FormLabel>
      </Col>
      <Col xs={12} md={8}>
        <div className="container p-4 border rounded">
          <div className="fw-semibold mb-3">Assign to</div>
          
          {/* Everyone Tag */}
          <div className="d-flex flex-wrap border rounded p-1 gap-2 mb-3">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-light border rounded">
              <span>Everyone</span>
              <button
                className="btn btn-link p-0 text-secondary"
                style={{ 
                  textDecoration: 'none',
                  fontSize: '1rem',
                  lineHeight: '1'
                }}
                aria-label="Remove Everyone"
              >
                ×
              </button>
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-3">
            <FormLabel className="fw-semibold">Due</FormLabel>
            <FormControl type="datetime-local" defaultValue={assignment?.dueDate} />
          </div>

          {/* Available From and Until */}
          <Row className="g-3">
            <Col xs={12} md={6}>
              <FormLabel className="fw-semibold">Available From</FormLabel>
              <FormControl type="date" defaultValue={assignment?.availableDate} />
            </Col>
            <Col xs={12} md={6}>
              <FormLabel className="fw-semibold">Until</FormLabel>
              <FormControl type="date" defaultValue={assignment?.untilDate} />
            </Col>
          </Row>
          
        </div>
      </Col>
    </Row>
    
        <div className="d-flex justify-content-end mt-3" >
          <Link href={`/Courses/${cid}/Assignments`}>

          <button className="btn btn-secondary me-2" >Cancel</button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
          <button className="btn btn-danger me-2">Save</button>
          </Link>
        </div>
      </Form>
    </div>
    </div>
  );
}
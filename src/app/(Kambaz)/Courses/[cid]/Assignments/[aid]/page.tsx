// export default function AssignmentEditor() {
//   return (
//     <div id="wd-assignments-editor">
//       <label htmlFor="wd-name">Assignment Name</label><br />
 
import { Form, FormLabel, FormGroup, FormSelect, Row, Col, FormControl } from 'react-bootstrap';
 
//       <input id="wd-name"  defaultValue="A1 - ENV + HTML" /><br /><br />
//       <textarea
//         id="wd-description" rows={6} cols={60}
//         defaultValue="The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, links to Kambaz application, links to all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page."
//       />
//       <br />
//       <table>
//         <tbody>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-points">Points</label>
//             </td>
//             <td>
//               <input id="wd-points" defaultValue={100} />
//             </td>
            
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//                 <label htmlFor="wd-group">Assignment Group</label>
//             </td>
//             <td>
//               <select id="wd-group">
//                 <option selected value="Assignments">Assignments</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//                 <label htmlFor="wd-display-grade-as">Display Grade as</label>
//             </td>
//             <td>
//                 <select id="wd-display-grade-as">
//                 <option selected value="">Percentage</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
 
//                 <label htmlFor="wd-submission-type">Submission Type</label>
//             </td>
//             <td>
//                 <select id="wd-submission-type">
//                 <option selected value="online">Online</option>
//               </select>
//               <div>Online Entry Options</div>
              
                
 
//                 <input type="checkbox" id="wd-text-entry"/>
//                 <label htmlFor="wd-text-entry">Text Entry</label><br/>
 
//                 <input type="checkbox"  id="wd-website-url"/>
//                 <label htmlFor="wd-website-url">Website URL</label><br/>
 
//                 <input type="checkbox"  id="wd-media-recordings"/>
//                 <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
 
//                 <input type="checkbox"  id="wd-student-annotation"/>
//                 <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
 
//                 <input type="checkbox"  id="wd-file-upload"/>
//                 <label htmlFor="wd-file-upload">File Uploads</label><br/>  
//             </td>
//           </tr>
//           <tr>
//             <td align="right" valign="top">
//                 <label htmlFor="wd-due-date">Due</label>
//             </td>
//             <td>
//               <input id="wd-due-date" type= "date" defaultValue="2024-05-13T23:59" />
//             </td>
//           </tr>
//             <tr>
//                 <td align="right" valign="top">
//                     <label htmlFor="wd-available-from">Available From</label>
//                 </td>
//                 <td>
//                     <input id="wd-available-from"
//                     type="date" defaultValue="2024-05-06"></input>
//                     <label htmlFor="wd-available-until"> Until </label>
//                     <input id="wd-available-until"
//                     type="date" defaultValue="2024-05-20"></input>
//                 </td>
//                 </tr>
//         </tbody>
//       </table>
 
//       <button>Save</button>
//       <button>Cancel</button>
//     </div>
// );}
import "../../../../styles.css";
export default function AssignmentPage() {
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl type="textarea" placeholder="A1" />
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
            <FormControl type="text" placeholder="100" />
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
            <FormControl type="datetime-local" defaultValue="2024-05-13T23:59" />
          </div>
 
          {/* Available From and Until */}
          <Row className="g-3">
            <Col xs={12} md={6}>
              <FormLabel className="fw-semibold">Available From</FormLabel>
              <FormControl type="date" defaultValue="2024-05-06" />
            </Col>
            <Col xs={12} md={6}>
              <FormLabel className="fw-semibold">Until</FormLabel>
              <FormControl type="date" defaultValue="2024-05-20" />
            </Col>
          </Row>
          
        </div>
      </Col>
    </Row>
    
        <div className="d-flex justify-content-end mt-3">
          
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-danger me-2">Save</button>
        </div>
      </Form>
    </div>
    </div>
  );
}
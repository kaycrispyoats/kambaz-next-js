export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      {/* Description */}
      <textarea id="wd-description" rows={6} cols={60}>
        The assignment is available online Submit a link to the landing page of your Web
        application running on Netlify. The landing page should include the following:
        Your full name and section Links to each of the lab assignments Link to the
        Kanbas application Links to all relevant source code repositories The Kanbas
        application should include a link to navigate back to the landing page.
      </textarea>
      <br /><br />

      <table>
        {/* Points */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>

        {/* Assignment Group */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
            </select>
          </td>
        </tr>

        {/* Display Grade As */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
            </select>
          </td>
        </tr>

        {/* Submission Type */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
            </select>
            <br /><br />
            <div>Online Entry Options</div>
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label><br />
            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label><br />
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label><br />
          </td>
        </tr>

        {/* Assign */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign Assign to</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>

        {/* Due Date */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
          </td>
        </tr>

        {/* Available From / Until */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            <label htmlFor="wd-available-until"> Until </label>
            <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
          </td>
        </tr>
      </table>
      <br />

      {/* Buttons */}
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}

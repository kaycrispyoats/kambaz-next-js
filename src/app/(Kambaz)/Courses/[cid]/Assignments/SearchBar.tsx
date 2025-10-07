import { CiSearch } from "react-icons/ci";
import "../../../styles.css"
export default function SearchBar() {
  return (
    <div id="wd-module-controls" className="text-nowrap">
      <div className="d-flex my-3">
      <div className="input-group" style={{ maxWidth: "400px" }}>
        <span className="input-group-text bg-white border-end-0">
            <CiSearch className="text-secondary fs-4" />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  
    </div> );}
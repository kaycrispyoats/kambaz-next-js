import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="row g-4 align-items-start">
      
      {/* Left side: Modules content */}
      <div className="col-lg-8 col-12">
        <Modules />
      </div>
      {/* Right side: CourseStatus sidebar */}
      <div className="col-lg-4 d-none d-lg-block">
      
        <CourseStatus />
      </div>
    </div>
  );
}
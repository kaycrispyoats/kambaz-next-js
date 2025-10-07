"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import CourseStatus from "./Home/Status";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout(
  { children, params }: { children: ReactNode; params: { cid: string } }
) {
  const { cid } = params;



  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
          <div style={{ width: "350px", marginLeft: "20px" }}>
          </div>
      </div>
    </div>
  );
}


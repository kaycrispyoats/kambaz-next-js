"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import "../../styles.css";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  // Normalize cid to a string
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((course: any) => course._id === cid);

  // sandwich courses toggle
  const [showNav, setShowNav] = useState(true);
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={toggleNav} // nav toggle
        />
        {course?.name}
        <span className="ms-2">
          <Breadcrumb course={course} />
        </span>
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            {cid && <CourseNavigation cid={cid} />}
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}

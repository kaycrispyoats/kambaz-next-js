"use client";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enroll, unenroll } from "../Courses/enrollmentsReducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  const [showAll, setShowAll] = useState(false); // Enrollments toggle

  if (!currentUser) return <div>Please log in to view courses</div>;

  // Helper: check if user is enrolled in a course
  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.user === currentUser._id && e.course === courseId);

  // Determine which courses to show
  const displayedCourses = showAll
    ? courses
    : courses.filter(c => isEnrolled(c._id));

  // Toggle enrollment
  const handleEnrollToggle = (courseId: string) => {
    if (isEnrolled(courseId)) {
      dispatch(unenroll({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button variant="primary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
      as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardBody>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                  </Link>

                  <Button
                    className="me-2"
                    variant={isEnrolled(course._id) ? "danger" : "success"}
                    onClick={() => handleEnrollToggle(course._id)}
                  >
                    {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                  </Button>

                  <Button
                    variant="primary"
                    onClick={(event) => {
                      event.preventDefault();
                      if (isEnrolled(course._id)) {
                        window.location.href = `/Courses/${course._id}/Home`;
                      } else {
                        alert("You are not enrolled in this course.");
                      }
                    }}
                  >
                    Go
                  </Button>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }}
                    className="btn btn-danger float-end"
                    id="wd-delete-course-click"
                  >
                    Delete
                  </button>

                  <button
                    id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end"
                  >
                    Edit
                  </button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

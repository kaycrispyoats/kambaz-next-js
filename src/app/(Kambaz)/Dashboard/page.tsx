"use client";
import * as client from "../Courses/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enroll, unenroll, setEnrollments } from "../Courses/enrollmentsReducer";
import { RootState } from "../store";
import type { AppDispatch } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const isFaculty = currentUser?.role === "FACULTY";

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

  const [showAll, setShowAll] = useState(false); // toggle between enrolled vs all

  // Checks if current user is enrolled in a course
  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.user === currentUser?._id && e.course === courseId);

  // Recalculate displayed courses on every render
  const displayedCourses = courses;

  // Fetch all courses from server
  const fetchAllCourses = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (err) {
      console.error("Failed to fetch all courses:", err);
    }
  };

  // Fetch only courses current user is enrolled in
  const fetchMyCourses = async () => {
  try {
    console.log(" Fetching MY courses...");
    const myCourses = await client.findMyCourses();
    console.log(" My courses received:", myCourses);
    dispatch(setCourses(myCourses));
  } catch (err) {
    console.error("Failed to fetch my courses:", err);
  }
};

  // Enroll / unenroll current user in a course
  const handleEnrollToggle = async (courseId: string) => {
  if (!currentUser) return;

  try {
  if (isEnrolled(courseId)) {
    await client.unenrollUserFromCourse(courseId);
  } else {
    try {
      await client.enrollUserInCourse(courseId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 409) {
        console.warn("Already enrolled - ignoring conflict");
      } else {
        throw err;
      }
    }
  }
  const updated = await client.fetchEnrollmentsForCurrentUser();
  dispatch(setEnrollments(updated));
} catch (err) {
  console.error("Enroll toggle failed:", err);
}
};

  const onAddNewCourse = async () => {
    if (!currentUser) return;
    try {
      const newCourse = await client.createCourse(course);
      dispatch(addNewCourse(newCourse));
      setShowAll(true);
    } catch (err) {
      console.error("Failed to create course:", err);
      alert("Create failed — check console for details");
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter(c => c._id !== courseId)));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map(c => c._id === course._id ? course : c)));
    } catch (err) {
      console.error("Failed to update course:", err);
    }
  };

  // Load courses when component mounts or showAll changes
  useEffect(() => {
    if (!currentUser) return;
    if (showAll) fetchAllCourses();
    else fetchMyCourses();
  }, [currentUser, showAll]);

  // Fetch current user's enrollments on mount
  useEffect(() => {
  const fetchEnrollments = async () => {
    if (!currentUser) return;
    try {
      console.log(" Fetching enrollments for user:", currentUser._id);
      const data = await client.fetchEnrollmentsForCurrentUser();
      console.log(" Enrollments received:", data);
      dispatch(setEnrollments(data));
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    }
  };
  fetchEnrollments();
}, [currentUser]);

  if (!currentUser) return <div>Please log in to view courses</div>;

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
        <button className="btn btn-primary float-end" onClick={onAddNewCourse}>Add</button>
        <button className="btn btn-warning float-end me-2" onClick={onUpdateCourse}>Update</button>
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
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</CardText>
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEnrolled(course._id)) window.location.href = `/Courses/${course._id}/Home`;
                      else alert("You are not enrolled in this course.");
                    }}
                  >
                    Go
                  </Button>

                  <button onClick={(e) => { e.preventDefault(); onDeleteCourse(course._id); }} className="btn btn-danger float-end">Delete</button>
                  <button onClick={(e) => { e.preventDefault(); setCourse(course); }} className="btn btn-warning me-2 float-end">Edit</button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

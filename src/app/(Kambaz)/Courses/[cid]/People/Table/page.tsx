"use client";
import React from "react";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

// Define the types for users and enrollments
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

type Enrollment = {
  user: string;   // user _id
  course: string; // course id
};

export default function PeopleTable() {
  const { cid } = useParams();
  const users: User[] = db.users || [];
  const enrollments: Enrollment[] = db.enrollments || [];

  // Filter users enrolled in the current course
  const courseUsers = users.filter((usr) =>
    enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
  );

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No users enrolled in this course.
              </td>
            </tr>
          ) : (
            courseUsers.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

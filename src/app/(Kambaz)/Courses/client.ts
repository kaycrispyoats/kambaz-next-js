import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const MODULES_API = `${HTTP_SERVER}/api/modules`; // Defined here for consistency
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

// --- ENROLLMENT/UNENROLLMENT FUNCTIONS (MUST USE ENROLLMENTS_API) ---

export const enrollUserInCourse = async (courseId: string) => {
  const resp = await axiosWithCredentials.post(`${ENROLLMENTS_API}/current/courses/${courseId}`);
  return resp.data;
};

export const unenrollUserFromCourse = async (courseId: string) => {
  const resp = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/current/courses/${courseId}`);
  return resp.data;
};

export const fetchEnrollmentsForCurrentUser = async () => {
  const resp = await axiosWithCredentials.get(`${ENROLLMENTS_API}/current?ts=${Date.now()}`);
  return resp.data;
};


// --- COURSE/MODULE/ASSIGNMENT FUNCTIONS ---

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// NEW FUNCTION ADDED: createModuleForCourse to resolve the import error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createModuleForCourse = async (courseId: string, module: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
    return data;
};


export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// create assignment for a course
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

// update assignment by id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
  return data;
};

// delete assignment
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

// Get a single assignment by ID
export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const getEnrollmentCount = async (courseId: string): Promise<number> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/courses/${courseId}/enrollments/count`);
  return response.data.count;
};
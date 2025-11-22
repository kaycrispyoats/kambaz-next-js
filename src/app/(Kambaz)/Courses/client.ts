import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// fetch all enrollments for current user
export const fetchEnrollmentsForCurrentUser = async () => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/current`);
  return response.data;
};

export const enrollUserInCourse = async (courseId: string) => {
  await axiosWithCredentials.post(`${ENROLLMENTS_API}/current/courses/${courseId}`);
};

export const unenrollUserFromCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`${ENROLLMENTS_API}/current/courses/${courseId}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
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
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const deleteModule = async (moduleId: string) => {
 const response = await axios.delete(`${MODULES_API}/${moduleId}`);
 return response.data;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// create assignment for a course
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

// update assignment by id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
  return data;
};

// delete assignment
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

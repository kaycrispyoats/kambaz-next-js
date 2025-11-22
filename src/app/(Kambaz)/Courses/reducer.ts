/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
 courses: courses,
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // keep server _id if provided; otherwise generate one
    addNewCourse: (state, { payload: course }) => {
      const id = course._id ?? uuidv4();
      const newCourse = { ...course, _id: id };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course: any) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) => (c._id === course._id ? course : c)) as any;
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
});
// export setCourses too
export const { addNewCourse, deleteCourse, updateCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;

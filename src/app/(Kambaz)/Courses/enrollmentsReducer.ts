import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

type Enrollment = {
  user: string; // userId
  course: string; // courseId
};

const initialState = {
  enrollments: dbEnrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const exists = state.enrollments.find(
        (e) => e.user === action.payload.userId && e.course === action.payload.courseId
      );
      if (!exists) state.enrollments.push({ user: action.payload.userId, course: action.payload.courseId });
    },
    unenroll: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.userId && e.course === action.payload.courseId)
      );
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
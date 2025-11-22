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
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
  const exists = state.enrollments.find(
    (e) => e.user === action.payload.user && e.course === action.payload.course
  );
  if (!exists) state.enrollments.push(action.payload as Enrollment);
},
unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
  state.enrollments = state.enrollments.filter(
    (e) => !(e.user === action.payload.user && e.course === action.payload.course)
  );
},
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
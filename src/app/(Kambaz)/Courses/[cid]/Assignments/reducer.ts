import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments } from "../../../Database";
 
export type Assignment = {
  untilDate: string;
  description: string;
  availableDate: string;
  _id: string;
  title: string;
  course: string;
  details: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  completed: boolean;
  href?: string;
};
 
interface AssignmentsState {
  assignments: Assignment[];
}
 
const initialState: AssignmentsState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignments: assignments.map((a: any) => ({
    _id: a._id ?? uuidv4(),
    title: a.title ?? "",
    details: a.details ?? "",
    points: a.points ?? 100,
    dueDate: a.dueDate ?? "",
    availableFrom: a.availableFrom ?? "",
    availableUntil: a.availableUntil ?? "",
    course: a.course ?? "",
    completed: a.completed ?? false,
    href: a.href,
  })) as Assignment[],
};
 
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<Omit<Assignment, "_id" | "completed" | "href">>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...action.payload,
        details: action.payload.details || "New Assignment Details",
        title: action.payload.title || "New Assignment",
        course: action.payload.course || "", 
        completed: false,
      };
      state.assignments.push(newAssignment);
    },
 
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id 
          ? { ...a, ...action.payload }
          : a
      );
    },
    // add set assignments for storing data in server
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
  state.assignments = action.payload;
},
 
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

 
export const { addAssignment, updateAssignment, deleteAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export interface Answer {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorType: 'student' | 'instructor';
  text: string;
  createdAt: string;
  updatedAt: string;
}

// Get all answers for a post
export const getAnswersForPost = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/posts/${postId}/answers`);
  return response.data;
};

// Get student answers for a post
export const getStudentAnswers = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/posts/${postId}/answers/student`);
  return response.data;
};

// Get instructor answers for a post
export const getInstructorAnswers = async (postId: string): Promise<Answer[]> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/posts/${postId}/answers/instructor`);
  return response.data;
};

// Create an answer
export const createAnswer = async (
  postId: string,
  text: string,
  authorType: 'student' | 'instructor'
): Promise<Answer> => {
  const response = await axiosWithCredentials.post(`${API_BASE}/posts/${postId}/answers`, {
    text,
    authorType,
  });
  return response.data;
};

// Update an answer
export const updateAnswer = async (answerId: string, text: string): Promise<Answer> => {
  const response = await axiosWithCredentials.put(`${API_BASE}/answers/${answerId}`, {
    text,
  });
  return response.data;
};

// Delete an answer
export const deleteAnswer = async (answerId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${API_BASE}/answers/${answerId}`);
};
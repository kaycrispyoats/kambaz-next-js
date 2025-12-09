import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  authorRole: 'student' | 'instructor';
  type: 'question' | 'note' | 'poll';
  courseId: string;
  folder: string[];
  to: 'Entire Class' | 'Individual Students/Instructors';
  users: string[];
  views: number;
  readByUserIds: string[];
  createdAt: string;
  updatedAt: string;
}

// Get all posts for a course
export const getPostsForCourse = async (
  courseId: string,
  options?: {
    folder?: string;
    type?: string;
    search?: string;
    unread?: boolean;
  }
): Promise<Post[]> => {
  const params = new URLSearchParams();
  if (options?.folder) params.append('folder', options.folder);
  if (options?.type) params.append('type', options.type);
  if (options?.search) params.append('search', options.search);
  if (options?.unread) params.append('unread', 'true');

  const response = await axiosWithCredentials.get(
    `${API_BASE}/courses/${courseId}/posts${params.toString() ? '?' + params.toString() : ''}`
  );
  return response.data;
};

// Get a single post by ID
export const getPostById = async (postId: string): Promise<Post> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/posts/${postId}`);
  return response.data;
};

// Create a new post
export const createPost = async (
  courseId: string,
  postData: {
    title: string;
    content: string;
    type: 'question' | 'note' | 'poll';
    folder: string[];
    to?: 'Entire Class' | 'Individual Students/Instructors';
    users?: string[];
  }
): Promise<Post> => {
  const response = await axiosWithCredentials.post(
    `${API_BASE}/courses/${courseId}/posts`,
    postData
  );
  return response.data;
};

// Update a post
export const updatePost = async (
  postId: string,
  updates: {
    title?: string;
    content?: string;
    folder?: string[];
    to?: string;
    users?: string[];
  }
): Promise<Post> => {
  const response = await axiosWithCredentials.put(`${API_BASE}/posts/${postId}`, updates);
  return response.data;
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${API_BASE}/posts/${postId}`);
};

// Mark post as read
export const markPostAsRead = async (postId: string): Promise<void> => {
  await axiosWithCredentials.post(`${API_BASE}/posts/${postId}/mark-read`);
};
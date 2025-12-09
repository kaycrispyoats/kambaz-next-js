import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export interface Reply {
  _id: string;
  authorId: string;
  authorName: string;
  authorType: 'student' | 'instructor';
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Discussion {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorType: 'student' | 'instructor';
  text: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

// Get all discussions for a post
export const getDiscussionsForPost = async (postId: string): Promise<Discussion[]> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/posts/${postId}/discussions`);
  return response.data;
};

// Create a discussion
export const createDiscussion = async (
  postId: string,
  text: string,
  authorType: 'student' | 'instructor'
): Promise<Discussion> => {
  const response = await axiosWithCredentials.post(`${API_BASE}/posts/${postId}/discussions`, {
    text,
    authorType,
  });
  return response.data;
};

// Update a discussion
export const updateDiscussion = async (discussionId: string, text: string): Promise<Discussion> => {
  const response = await axiosWithCredentials.put(`${API_BASE}/discussions/${discussionId}`, {
    text,
  });
  return response.data;
};

// Delete a discussion
export const deleteDiscussion = async (discussionId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${API_BASE}/discussions/${discussionId}`);
};

// Toggle resolved status
export const toggleResolved = async (discussionId: string): Promise<Discussion> => {
  const response = await axiosWithCredentials.post(
    `${API_BASE}/discussions/${discussionId}/toggle-resolved`
  );
  return response.data;
};

// Add a reply to a discussion
export const addReply = async (
  discussionId: string,
  text: string,
  authorType: 'student' | 'instructor'
): Promise<Discussion> => {
  const response = await axiosWithCredentials.post(
    `${API_BASE}/discussions/${discussionId}/replies`,
    {
      text,
      authorType,
    }
  );
  return response.data;
};

// Update a reply
export const updateReply = async (
  discussionId: string,
  replyId: string,
  text: string
): Promise<Discussion> => {
  const response = await axiosWithCredentials.put(
    `${API_BASE}/discussions/${discussionId}/replies/${replyId}`,
    {
      text,
    }
  );
  return response.data;
};

// Delete a reply
export const deleteReply = async (discussionId: string, replyId: string): Promise<Discussion> => {
  const response = await axiosWithCredentials.delete(
    `${API_BASE}/discussions/${discussionId}/replies/${replyId}`
  );
  return response.data;
};
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export interface Folder {
  _id: string;
  name: string;
  courseId: string;
  createdBy: string;
  createdAt: string;
  order: number;
}

// Get all folders for a course
export const getFoldersForCourse = async (courseId: string): Promise<Folder[]> => {
  const response = await axiosWithCredentials.get(`${API_BASE}/courses/${courseId}/folders`);
  return response.data;
};

// Create a new folder
export const createFolder = async (courseId: string, name: string, order?: number): Promise<Folder> => {
  const response = await axiosWithCredentials.post(`${API_BASE}/courses/${courseId}/folders`, {
    name,
    order,
  });
  return response.data;
};

// Update a folder
export const updateFolder = async (folderId: string, name: string, order?: number): Promise<Folder> => {
  const response = await axiosWithCredentials.put(`${API_BASE}/folders/${folderId}`, {
    name,
    order,
  });
  return response.data;
};

// Delete a single folder
export const deleteFolder = async (folderId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${API_BASE}/folders/${folderId}`);
};

// Delete multiple folders
export const deleteFolders = async (courseId: string, folderIds: string[]): Promise<void> => {
  await axiosWithCredentials.post(`${API_BASE}/courses/${courseId}/folders/delete`, {
    folderIds,
  });
};
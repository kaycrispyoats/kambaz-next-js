import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as foldersClient from './client/folders';

interface Folder {
  _id: string;
  name: string;
  courseId: string;
  createdBy: string;
  createdAt: string;
  order: number;
}

interface ManageFoldersScreenProps {
  courseId: string;
}

export default function ManageFoldersScreen({ courseId }: ManageFoldersScreenProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolders, setSelectedFolders] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Load folders on mount
  useEffect(() => {
    loadFolders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const loadFolders = async () => {
    try {
      setLoading(true);
      const data = await foldersClient.getFoldersForCourse(courseId);
      setFolders(data);
    } catch (error) {
      console.error('Error loading folders:', error);
      alert('Failed to load folders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const newFolder = await foldersClient.createFolder(courseId, newFolderName.trim());
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error creating folder:', error);
      alert(error.response?.data?.message || 'Failed to create folder');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFolders.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedFolders.size} folder(s)?`
    );
    if (!confirmed) return;

    try {
      await foldersClient.deleteFolders(courseId, Array.from(selectedFolders));
      setFolders(folders.filter((f) => !selectedFolders.has(f._id)));
      setSelectedFolders(new Set());
    } catch (error) {
      console.error('Error deleting folders:', error);
      alert('Failed to delete folders');
    }
  };

  const handleToggleSelect = (folderId: string) => {
    const newSelected = new Set(selectedFolders);
    if (newSelected.has(folderId)) {
      newSelected.delete(folderId);
    } else {
      newSelected.add(folderId);
    }
    setSelectedFolders(newSelected);
  };

  const handleStartEdit = (folder: Folder) => {
    setEditingId(folder._id);
    setEditingName(folder.name);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;

    try {
      const updatedFolder = await foldersClient.updateFolder(editingId, editingName.trim());
      setFolders(folders.map((f) => (f._id === editingId ? updatedFolder : f)));
      setEditingId(null);
      setEditingName('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating folder:', error);
      alert(error.response?.data?.message || 'Failed to update folder');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <div className="bg-white rounded border">
        {/* Header */}
        <div className="p-4 border-bottom">
          <h2 className="m-0 h4 fw-semibold text-dark">
            Configure Class Folders
          </h2>
          <p className="text-muted mt-2 mb-0 small lh-base">
            Folders allow you to keep class content organized. When students and instructors add a new post, they will be required to specify at least one folder for their post.
          </p>
        </div>

        {/* Content */}
        <div className="p-4">
          
          {/* Create new folders section */}
          <div className="mb-5">
            <h3 className="h6 fw-semibold text-dark mb-3">
              Create new folders:
            </h3>
            <p className="text-muted mb-3 small">
              Add folders that are relevant for your class.
            </p>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                placeholder="Add a folder"
                className="form-control form-control-sm w-auto"
                style={{ maxWidth: '300px' }}
              />
              <button
                onClick={handleAddFolder}
                className="btn btn-primary btn-sm fw-medium"
              >
                Add folder
              </button>
            </div>
          </div>

          {/* Manage folders section */}
          <div>
            <h3 className="h6 fw-semibold text-dark mb-3">
              Manage folders:
            </h3>
            <p className="text-muted mb-3 small lh-base">
              Delete or edit folder names.
            </p>

            {/* Delete button - only show when folders are selected */}
            {selectedFolders.size > 0 && (
              <div className="mb-3">
                <button
                  onClick={handleDeleteSelected}
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                >
                  <FaTrash size={11} />
                  Delete selected folders
                </button>
              </div>
            )}

            {/* Folders list */}
            <div className="border rounded">
              {folders.length === 0 ? (
                <div className="text-center text-muted p-4">
                  No folders yet. Create one above!
                </div>
              ) : (
                folders.map((folder) => (
                  <div
                    key={folder._id}
                    className={`d-flex align-items-center p-2 px-3 border-bottom ${
                      selectedFolders.has(folder._id) ? 'bg-light' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFolders.has(folder._id)}
                      onChange={() => handleToggleSelect(folder._id)}
                      className="form-check-input me-2"
                      style={{ cursor: 'pointer' }}
                    />

                    {editingId === folder._id ? (
                      <>
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          className="form-control form-control-sm flex-grow-1 border-primary bg-primary bg-opacity-10"
                          autoFocus
                        />
                        <div className="d-flex gap-2 ms-2">
                          <button
                            onClick={handleSaveEdit}
                            className="btn btn-primary btn-sm px-3 py-1"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-outline-secondary btn-sm px-3 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="flex-grow-1 rounded d-inline-block px-2 py-1 small bg-primary bg-opacity-10">
                          {folder.name}
                        </span>
                        <button
                          onClick={() => handleStartEdit(folder)}
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 ms-2 px-2 py-1"
                        >
                          <FaEdit size={10} /> Edit
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
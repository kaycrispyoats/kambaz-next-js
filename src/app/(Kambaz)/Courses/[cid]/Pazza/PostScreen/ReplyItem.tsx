import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";

export interface Reply {
  id: string; 
  author: string; 
  authorRole: 'student' | 'instructor'; 
  content: string; 
  createdAt: Date; 
}

export default function ReplyItem({
  reply,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete,
  onReply
}: {
  reply: Reply;
  currentUserName: string;
  currentUserRole: 'student' | 'instructor';
  onEdit: (newContent: string) => void;
  onDelete: () => void;
  onReply: () => void;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  const isAuthorOrInstructor = 
    reply.author === currentUserName || currentUserRole === 'instructor';

  const handleSaveEdit = () => {
    if (editedContent.trim() && editedContent !== reply.content) {
      onEdit(editedContent.trim());
    }
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(reply.content);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="ms-4 border-start ps-3 py-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold small">{reply.author}</span>
            {reply.authorRole === 'instructor' && (
              <span className="badge bg-warning text-dark small">
                Instructor
              </span>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">{reply.createdAt.toLocaleString()}</span>
            <ActionDropdown
              onEdit={() => setShowEditModal(true)}
              onDelete={onDelete}
              isAuthorOrInstructor={isAuthorOrInstructor}
            />
          </div>
        </div>
        <div 
          className="small mb-2"
          dangerouslySetInnerHTML={{ __html: reply.content }}
        />
        <button
          onClick={onReply}
          className="btn btn-link btn-sm p-0 text-primary d-flex align-items-center gap-1"
        >
          <FiMessageSquare size={14} />
          Reply
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Reply</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCancelEdit}
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="form-control"
                    rows={4}
                    autoFocus
                  />
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </>
  );
}
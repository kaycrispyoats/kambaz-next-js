import { useState } from "react";
import ActionDropdown from "./ActionDropdown";

export interface Answer {
  id: string;
  author: string;
  authorRole: 'student' | 'instructor';
  content: string;
  createdAt: Date;
}

export default function AnswerItem({
  answer,
  currentUserName,
  currentUserRole,
  onEdit,
  onDelete
}: {
  answer: Answer;
  currentUserName: string;
  currentUserRole: 'student' | 'instructor';
  onEdit: (newContent: string) => void;
  onDelete: () => void;
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);

  const isAuthorOrInstructor = 
    answer.author === currentUserName || currentUserRole === 'instructor';

  const handleSaveEdit = () => {
    if (editedContent.trim() && editedContent !== answer.content) {
      onEdit(editedContent.trim());
    }
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(answer.content);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="border-bottom py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold">{answer.author}</span>
            {answer.authorRole === 'instructor' && (
              <span className="badge bg-warning text-dark">Instructor</span>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">{answer.createdAt.toLocaleString()}</small>
            {isAuthorOrInstructor && (
              <button 
                type="button" 
                onClick={() => setShowEditModal(true)} 
                className="btn btn-link btn-sm text-primary p-0"
              >
                Edit
              </button>
            )}
            <ActionDropdown
              onEdit={() => setShowEditModal(true)}
              onDelete={onDelete}
              isAuthorOrInstructor={isAuthorOrInstructor}
            />
          </div>
        </div>

        {/* Content */}
        <div 
          className="mb-0"
          dangerouslySetInnerHTML={{ __html: answer.content }}
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Answer</h5>
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
                    rows={6}
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
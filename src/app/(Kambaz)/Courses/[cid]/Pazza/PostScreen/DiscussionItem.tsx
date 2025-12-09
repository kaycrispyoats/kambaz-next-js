import { useState } from "react";
import ReplyItem, { Reply } from "./ReplyItem";
import { FiMessageSquare } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";

export interface Discussion {
  id: string;
  author: string;
  authorRole: 'student' | 'instructor';
  content: string;
  createdAt: Date;
  isResolved: boolean;
  replies: Reply[];
}

export default function DiscussionItem({
  discussion,
  currentUserName,
  currentUserRole,
  onToggleResolved,
  onEdit,
  onDelete,
  onAddReply,
  onEditReply,
  onDeleteReply
}: {
  discussion: Discussion;
  currentUserName: string;
  currentUserRole: 'student' | 'instructor';
  onToggleResolved: () => void;
  onEdit: (newContent: string) => void;
  onDelete: () => void;
  onAddReply: (replyContent: string, parentReplyId?: string) => void;
  onEditReply?: (replyId: string, newContent: string) => void;
  onDeleteReply?: (replyId: string) => void;
}) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyToReplyId, setReplyToReplyId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(discussion.content);

  const isAuthorOrInstructor = 
    discussion.author === currentUserName || currentUserRole === 'instructor';

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onAddReply(replyContent, replyToReplyId || undefined);
      setReplyContent('');
      setShowReplyEditor(false);
      setReplyToReplyId(null);
    }
  };

  const handleReplyToReply = (replyId: string) => {
    setReplyToReplyId(replyId);
    setShowReplyEditor(true);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() && editedContent !== discussion.content) {
      onEdit(editedContent.trim());
    }
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(discussion.content);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={onToggleResolved}
                className={`btn btn-sm ${
                  discussion.isResolved ? "btn-success" : "btn-secondary"
                }`}
              >
                {discussion.isResolved ? 'Resolved' : 'Unresolved'}
              </button>
              <span className="fw-semibold">{discussion.author}</span>
              {discussion.authorRole === 'instructor' && (
                <span className="badge bg-warning text-dark">Instructor</span>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">{discussion.createdAt.toLocaleString()}</small>
              <ActionDropdown
                onEdit={() => setShowEditModal(true)}
                onDelete={onDelete}
                isAuthorOrInstructor={isAuthorOrInstructor}
              />
            </div>
          </div>

          {/* Content */}
          <div 
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: discussion.content }}
          />

          {/* Replies */}
          {discussion.replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              currentUserName={currentUserName}
              currentUserRole={currentUserRole}
              onEdit={(newContent) => onEditReply?.(reply.id, newContent)}
              onDelete={() => onDeleteReply?.(reply.id)}
              onReply={() => handleReplyToReply(reply.id)}
            />
          ))}

          {/* Reply Input */}
          <div className="mt-2">
            {!showReplyEditor ? (
              <button
                onClick={() => setShowReplyEditor(true)}
                className="btn btn-link btn-sm text-primary d-flex align-items-center gap-1 p-0"
              >
                <FiMessageSquare />
                Reply
              </button>
            ) : (
              <div className="mt-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="form-control mb-2"
                  style={{ minHeight: "80px", resize: "none" }}
                />
                <div className="d-flex gap-2">
                  <button
                    onClick={handleSubmitReply}
                    className="btn btn-primary btn-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setShowReplyEditor(false);
                      setReplyContent('');
                      setReplyToReplyId(null);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Discussion</h5>
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
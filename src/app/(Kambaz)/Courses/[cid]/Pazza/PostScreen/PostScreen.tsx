import { useState, useEffect } from "react";
import DiscussionItem, { Discussion } from "./DiscussionItem";
import AnswerItem, { Answer } from "./AnswerItem";
import { BsFileText, BsQuestionCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ActionDropdown from "./ActionDropdown";
import Editor from "./editor";
import { Post } from "../ListOfPostsSidebar/PostItem";
import * as answersClient from "../client/answers";
import * as discussionsClient from "../client/discussions";
import * as postsClient from "../client/posts";

interface PostScreenProps {
  post: Post | null;
  currentUserRole: 'student' | 'instructor';
  currentUserName: string;
  onPostUpdated?: () => void;
}

export default function PostScreen({ 
  post, 
  currentUserRole,
  currentUserName,
  onPostUpdated
}: PostScreenProps) {
  const [studentAnswers, setStudentAnswers] = useState<Answer[]>([]);
  const [instructorAnswers, setInstructorAnswers] = useState<Answer[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [newStudentAnswer, setNewStudentAnswer] = useState('');
  const [newInstructorAnswer, setNewInstructorAnswer] = useState('');
  const [newDiscussion, setNewDiscussion] = useState('');

  // Load answers and discussions when post changes
  useEffect(() => {
    const loadPostData = async () => {
      if (!post) return;
      
      setLoading(true);
      try {
        // Mark post as read
        await postsClient.markPostAsRead(post.id);
        
        // Notify parent to refresh posts
        if (onPostUpdated) {
          onPostUpdated();
        }

        // Load student answers
        const studentAns = await answersClient.getStudentAnswers(post.id);
        setStudentAnswers(studentAns.map(a => ({
          id: a._id,
          author: a.authorName,
          authorRole: a.authorType,
          content: a.text,
          createdAt: new Date(a.createdAt)
        })));

        // Load instructor answers
        const instructorAns = await answersClient.getInstructorAnswers(post.id);
        setInstructorAnswers(instructorAns.map(a => ({
          id: a._id,
          author: a.authorName,
          authorRole: a.authorType,
          content: a.text,
          createdAt: new Date(a.createdAt)
        })));

        // Load discussions
        const disc = await discussionsClient.getDiscussionsForPost(post.id);
        setDiscussions(disc.map(d => ({
          id: d._id,
          author: d.authorName,
          authorRole: d.authorType,
          content: d.text,
          createdAt: new Date(d.createdAt),
          isResolved: d.resolved,
          replies: d.replies.map(r => ({
            id: r._id,
            author: r.authorName,
            authorRole: r.authorType,
            content: r.text,
            createdAt: new Date(r.createdAt)
          }))
        })));
      } catch (error) {
        console.error('Error loading post data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [post?.id]);

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
        Select a post to view details
      </div>
    );
  }

  const isAuthorOrInstructor = 
    post.author === currentUserName || currentUserRole === 'instructor';

  const handleSubmitStudentAnswer = async () => {
    if (!newStudentAnswer.trim() || !post) return;
    
    try {
      const newAnswer = await answersClient.createAnswer(
        post.id,
        newStudentAnswer,
        'student'
      );
      
      setStudentAnswers([...studentAnswers, {
        id: newAnswer._id,
        author: newAnswer.authorName,
        authorRole: newAnswer.authorType,
        content: newAnswer.text,
        createdAt: new Date(newAnswer.createdAt)
      }]);
      setNewStudentAnswer('');
      
      // Refresh posts to update answer counts
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error creating answer:', error);
      alert('Failed to submit answer');
    }
  };

  const handleSubmitInstructorAnswer = async () => {
    if (!newInstructorAnswer.trim() || !post) return;
    
    try {
      const newAnswer = await answersClient.createAnswer(
        post.id,
        newInstructorAnswer,
        'instructor'
      );
      
      setInstructorAnswers([...instructorAnswers, {
        id: newAnswer._id,
        author: newAnswer.authorName,
        authorRole: newAnswer.authorType,
        content: newAnswer.text,
        createdAt: new Date(newAnswer.createdAt)
      }]);
      setNewInstructorAnswer('');
      
      // Refresh posts to update answer counts
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error creating answer:', error);
      alert('Failed to submit answer');
    }
  };

  const handleEditStudentAnswer = async (answerId: string, newText: string) => {
    try {
      const updated = await answersClient.updateAnswer(answerId, newText);
      setStudentAnswers(studentAnswers.map(a => 
        a.id === answerId ? {
          ...a,
          content: updated.text,
          createdAt: new Date(updated.updatedAt)
        } : a
      ));
    } catch (error) {
      console.error('Error editing answer:', error);
      alert('Failed to edit answer');
    }
  };

  const handleEditInstructorAnswer = async (answerId: string, newText: string) => {
    try {
      const updated = await answersClient.updateAnswer(answerId, newText);
      setInstructorAnswers(instructorAnswers.map(a => 
        a.id === answerId ? {
          ...a,
          content: updated.text,
          createdAt: new Date(updated.updatedAt)
        } : a
      ));
    } catch (error) {
      console.error('Error editing answer:', error);
      alert('Failed to edit answer');
    }
  };

  const handleDeleteStudentAnswer = async (answerId: string) => {
    if (!confirm('Are you sure you want to delete this answer?')) return;
    
    try {
      await answersClient.deleteAnswer(answerId);
      setStudentAnswers(studentAnswers.filter(a => a.id !== answerId));
      
      // Refresh posts to update answer counts
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error deleting answer:', error);
      alert('Failed to delete answer');
    }
  };

  const handleDeleteInstructorAnswer = async (answerId: string) => {
    if (!confirm('Are you sure you want to delete this answer?')) return;
    
    try {
      await answersClient.deleteAnswer(answerId);
      setInstructorAnswers(instructorAnswers.filter(a => a.id !== answerId));
      
      // Refresh posts to update answer counts
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error deleting answer:', error);
      alert('Failed to delete answer');
    }
  };

  const handleSubmitDiscussion = async () => {
    if (!newDiscussion.trim() || !post) return;
    
    try {
      const discussion = await discussionsClient.createDiscussion(
        post.id,
        newDiscussion,
        currentUserRole
      );
      
      setDiscussions([...discussions, {
        id: discussion._id,
        author: discussion.authorName,
        authorRole: discussion.authorType,
        content: discussion.text,
        createdAt: new Date(discussion.createdAt),
        isResolved: discussion.resolved,
        replies: []
      }]);
      setNewDiscussion('');
    } catch (error) {
      console.error('Error creating discussion:', error);
      alert('Failed to create discussion');
    }
  };

  const handleAddReply = async (discussionId: string, replyContent: string) => {
    try {
      const updatedDiscussion = await discussionsClient.addReply(
        discussionId,
        replyContent,
        currentUserRole
      );
      
      setDiscussions(discussions.map(d => 
        d.id === discussionId ? {
          id: updatedDiscussion._id,
          author: updatedDiscussion.authorName,
          authorRole: updatedDiscussion.authorType,
          content: updatedDiscussion.text,
          createdAt: new Date(updatedDiscussion.createdAt),
          isResolved: updatedDiscussion.resolved,
          replies: updatedDiscussion.replies.map(r => ({
            id: r._id,
            author: r.authorName,
            authorRole: r.authorType,
            content: r.text,
            createdAt: new Date(r.createdAt)
          }))
        } : d
      ));
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply');
    }
  };

  const toggleDiscussionResolved = async (discussionId: string) => {
    try {
      const updatedDiscussion = await discussionsClient.toggleResolved(discussionId);
      
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? {
          ...d,
          isResolved: updatedDiscussion.resolved
        } : d
      ));
    } catch (error) {
      console.error('Error toggling resolved:', error);
      alert('Failed to toggle resolved status');
    }
  };

  const handleEditDiscussion = async (discussionId: string, newText: string) => {
    try {
      const updated = await discussionsClient.updateDiscussion(discussionId, newText);
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? {
          ...d,
          content: updated.text
        } : d
      ));
    } catch (error) {
      console.error('Error editing discussion:', error);
      alert('Failed to edit discussion');
    }
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    if (!confirm('Are you sure you want to delete this discussion?')) return;
    
    try {
      await discussionsClient.deleteDiscussion(discussionId);
      setDiscussions(discussions.filter(d => d.id !== discussionId));
    } catch (error) {
      console.error('Error deleting discussion:', error);
      alert('Failed to delete discussion');
    }
  };

  const handleEditReply = async (discussionId: string, replyId: string, newText: string) => {
    try {
      const updatedDiscussion = await discussionsClient.updateReply(discussionId, replyId, newText);
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? {
          id: updatedDiscussion._id,
          author: updatedDiscussion.authorName,
          authorRole: updatedDiscussion.authorType,
          content: updatedDiscussion.text,
          createdAt: new Date(updatedDiscussion.createdAt),
          isResolved: updatedDiscussion.resolved,
          replies: updatedDiscussion.replies.map(r => ({
            id: r._id,
            author: r.authorName,
            authorRole: r.authorType,
            content: r.text,
            createdAt: new Date(r.createdAt)
          }))
        } : d
      ));
    } catch (error) {
      console.error('Error editing reply:', error);
      alert('Failed to edit reply');
    }
  };

  const handleDeleteReply = async (discussionId: string, replyId: string) => {
    if (!confirm('Are you sure you want to delete this reply?')) return;
    
    try {
      const updatedDiscussion = await discussionsClient.deleteReply(discussionId, replyId);
      setDiscussions(discussions.map(d =>
        d.id === discussionId ? {
          id: updatedDiscussion._id,
          author: updatedDiscussion.authorName,
          authorRole: updatedDiscussion.authorType,
          content: updatedDiscussion.text,
          createdAt: new Date(updatedDiscussion.createdAt),
          isResolved: updatedDiscussion.resolved,
          replies: updatedDiscussion.replies.map(r => ({
            id: r._id,
            author: r.authorName,
            authorRole: r.authorType,
            content: r.text,
            createdAt: new Date(r.createdAt)
          }))
        } : d
      ));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Failed to delete reply');
    }
  };

  return (
    <div className="container-fluid bg-white vh-100 overflow-auto">
      <div className="container py-4">
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Post Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              {post.type === 'question' ? (
                <BsQuestionCircle className="text-danger" />
              ) : (
                <BsFileText className="text-primary" />
              )}
              <span className="text-muted">{post.type}</span>
              <span className="text-muted">#{post.id.substring(0, 8)}</span>
              <span className="badge bg-light text-dark">
                {post.views} view{post.views !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {isAuthorOrInstructor && (
                <button className="btn btn-link text-primary d-flex align-items-center gap-1 p-0">
                  <FiEdit />
                  Edit
                </button>
              )}
              <ActionDropdown
                onEdit={() => console.log('Edit post')}
                onDelete={() => console.log('Delete post')}
                isAuthorOrInstructor={isAuthorOrInstructor}
              />
            </div>
          </div>

          <h1 className="h3 mb-2">{post.title}</h1>

          <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
            <span>{post.author}</span>
            {post.authorRole === 'instructor' && (
              <span className="badge bg-warning text-dark">Instructor</span>
            )}
            <span>•</span>
            <span>{post.createdAt.toLocaleString()}</span>
            {post.folder && post.folder.length > 0 && (
              <>
                <span>•</span>
                <span className="text-primary">{post.folder.join(', ')}</span>
              </>
            )}
          </div>

          <div 
            className="text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Answers Section */}
        {post.type === 'question' && (
          <>
            {/* Student Answers */}
            <div className="mb-4">
              <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
                <span>Student Answers</span>
                <small className="text-muted">({studentAnswers.length})</small>
              </h2>

              {studentAnswers.length === 0 && currentUserRole === 'student' ? (
                <div className="mb-3">
                  <p className="small text-muted">Be the first to answer this question!</p>
                  <Editor
                    value={newStudentAnswer}
                    onChange={setNewStudentAnswer}
                    onSubmit={handleSubmitStudentAnswer}
                    placeholder="Write your answer..."
                  />
                </div>
              ) : (
                <>
                  {studentAnswers.map(answer => (
                    <AnswerItem
                      key={answer.id}
                      answer={answer}
                      currentUserName={currentUserName}
                      currentUserRole={currentUserRole}
                      onEdit={((newContent: string) => { return handleEditStudentAnswer(answer.id, newContent); }) as unknown as () => void}
                      onDelete={() => { handleDeleteStudentAnswer(answer.id); }}
                    />
                  ))}
                  {studentAnswers.length > 0 && currentUserRole === 'student' && (
                    <div className="mt-2">
                      <Editor
                        value={newStudentAnswer}
                        onChange={setNewStudentAnswer}
                        onSubmit={handleSubmitStudentAnswer}
                        placeholder="Add another answer..."
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Instructor Answers */}
            <div className="mb-4">
              <h2 className="h5 mb-3 d-flex justify-content-between align-items-center">
                <span>Instructor Answers</span>
                <small className="text-muted">({instructorAnswers.length})</small>
              </h2>

              {instructorAnswers.map(answer => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  currentUserName={currentUserName}
                  currentUserRole={currentUserRole}
                  onEdit={((newContent: string) => { return handleEditInstructorAnswer(answer.id, newContent); }) as unknown as () => void}
                  onDelete={() => { handleDeleteInstructorAnswer(answer.id); }}
                />
              ))}
              {currentUserRole === 'instructor' && (
                <div className="mt-2">
                  <Editor
                    value={newInstructorAnswer}
                    onChange={setNewInstructorAnswer}
                    onSubmit={handleSubmitInstructorAnswer}
                    placeholder="Add your answer..."
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Follow-up Discussions */}
        <div className="mb-4">
          <h2 className="h5 mb-3">Follow-up Discussion</h2>

          {discussions.map(d => (
            <DiscussionItem
              key={d.id}
              discussion={d}
              currentUserName={currentUserName}
              currentUserRole={currentUserRole}
              onToggleResolved={() => { toggleDiscussionResolved(d.id); }}
              onEdit={(newContent) => { handleEditDiscussion(d.id, newContent); }}
              onDelete={() => { handleDeleteDiscussion(d.id); }}
              onAddReply={(content) => { handleAddReply(d.id, content); }}
              onEditReply={(replyId, newContent) => { handleEditReply(d.id, replyId, newContent); }}
              onDeleteReply={(replyId) => { handleDeleteReply(d.id, replyId); }}
            />
          ))}

          <div className="mt-3">
            <textarea
              value={newDiscussion}
              onChange={e => setNewDiscussion(e.target.value)}
              placeholder="Start a new follow-up discussion..."
              className="form-control mb-2"
              rows={4}
            />
            <button
              className="btn btn-primary"
              onClick={handleSubmitDiscussion}
            >
              Post Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
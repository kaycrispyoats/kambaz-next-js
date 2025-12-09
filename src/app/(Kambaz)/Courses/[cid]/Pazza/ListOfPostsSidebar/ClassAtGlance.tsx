
 
import React from 'react';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { Post } from './PostItem';
 

 
type Props = {
  posts: Post[];
  studentsEnrolled: number;
  currentUserId: string;
};
 
export default function ClassAtGlance({ posts, studentsEnrolled, currentUserId }: Props) {
  // --- Calculations ---
  const unreadCount = posts.filter((p) => !(p.readByUserIds?.includes(currentUserId))).length;
  const unansweredCount = posts.filter(
    (p) => p.studentAnswers.length === 0 && p.instructorAnswers.length === 0
  ).length;
  const instructorResponses = posts.reduce((sum, p) => sum + p.instructorAnswers.length, 0);
  const studentResponses = posts.reduce((sum, p) => sum + p.studentAnswers.length, 0);
  const totalPosts = posts.length;
  const totalContributions = instructorResponses + studentResponses;
 
  // Check if all critical items are resolved
  const noUnread = unreadCount === 0;
  const noUnanswered = unansweredCount === 0;
 
  return (
    <div className="bg-white border rounded p-4" style={{ maxWidth: 900 }}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <h2 className="m-0 fw-semibold text-dark" style={{ fontSize: 18 }}>
          Class at a Glance
        </h2>
        <div className="text-muted" style={{ fontSize: 12 }}>
          Updated just now
        </div>
      </div>
      
      <div className="d-flex gap-5">
        {/* Left Column: Status Checks */}
        <div className="flex-shrink-0">
          <StatusItem
            icon={noUnread ? FaCheck : FaExclamationCircle}
            text={noUnread ? "no unread posts" : `${unreadCount} unread posts`}
            isGood={noUnread}
          />
          <StatusItem
            icon={noUnanswered ? FaCheck : FaExclamationCircle}
            text={noUnanswered ? "no unanswered questions" : `${unansweredCount} unanswered questions`}
            isGood={noUnanswered}
          />
          <StatusItem
            icon={FaCheck}
            text="no unanswered followups"
            isGood={true}
          />
        </div>
 
        {/* Right Column: Stats */}
        <div className="flex-grow-1 border-start ps-5">
          <StatRow label="total posts" value={totalPosts} />
          <StatRow label="total contributions" value={totalContributions} />
          <StatRow label="instructors' responses" value={instructorResponses} />
          <StatRow label="students' responses" value={studentResponses} />
          <StatRow label="students enrolled" value={studentsEnrolled} />
        </div>
      </div>
    </div>
  );
}
 
function StatusItem({ icon: Icon, text, isGood }: { icon: React.ElementType; text: string; isGood: boolean }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <div
        className={`d-flex align-items-center justify-content-center rounded ${
          isGood ? 'bg-success' : 'bg-secondary'
        }`}
        style={{ width: 20, height: 20 }}
      >
        <Icon size={12} color="white" />
      </div>
      <span className="text-dark" style={{ fontSize: 14 }}>{text}</span>
    </div>
  );
}
 
function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: 14 }}>
      <span className="text-dark">{label}</span>
      <span className="fw-semibold text-dark text-end" style={{ minWidth: 30 }}>
        {value}
      </span>
    </div>
  );
}
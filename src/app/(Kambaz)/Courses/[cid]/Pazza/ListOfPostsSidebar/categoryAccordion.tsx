import React from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import PostItem, { Post } from "./PostItem";




interface CategoryAccordionProps {
  title: string;
  posts: Post[];
  isOpen: boolean;
  onToggle: () => void;
  onPostClick: (postId: string) => void;
}

export default function CategoryAccordion({
  title,
  posts,
  isOpen,
  onToggle,
  onPostClick,
}: CategoryAccordionProps) {
  return (
    <div className="border-bottom">
      <button
        onClick={onToggle}
        className="w-100 px-3 py-2 d-flex align-items-center justify-content-between text-start bg-light hover-bg-light border-0"
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex align-items-center gap-2">
          {isOpen ? (
            <FiChevronDown size={16} />
          ) : (
            <FiChevronRight size={16} />
          )}
          <span className="text-uppercase small fw-semibold text-secondary">
            {title}
          </span>
        </div>
      </button>

      {isOpen && (
        <div>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

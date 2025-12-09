"use client";

import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import NewPostButton from "./NewPostButton";
import SearchPostsField from "./SearchPostsField";
import CategoryAccordion from "./categoryAccordion";
import PostScreen from "../PostScreen/PostScreen";
import NewPostForm from "../NewPost/NewPostForm";
import { Post } from "./PostItem";
import ClassAtGlance from "./ClassAtGlance";
import * as postsClient from '../client/posts';
import axios from "axios";
import * as answersClient from '../client/answers';
import * as enrollmentsClient from '../../../../Courses/client';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";
interface ListOfPostsSidebarProps {
  courseId: string;
}


// --- Helper function to categorize posts ---
const categorizePost = (date: Date, now: Date): string => {
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last Week";

  const postDate = new Date(date);
  const day = postDate.getDay();
  const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(postDate.setDate(diff));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
};

const ListOfPostsSidebar: React.FC<ListOfPostsSidebarProps> = ({ courseId }) => {
  // Load sidebar state from localStorage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE}/users/profile`, {
          withCredentials: true
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [searchQuery, setSearchQuery] = useState("");
  
  // Load open categories from localStorage
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('openCategories');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    }
    return new Set(["Today", "Yesterday", "Last Week"]);
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(0); 

  // Load posts from API
  // Load posts from API
useEffect(() => {
  const loadPosts = async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      const data = await postsClient.getPostsForCourse(courseId);
      
      // For each post, fetch answer counts
      const transformedPosts = await Promise.all(data.map(async (p) => {
        // Fetch answers to get counts
        const studentAns = await answersClient.getStudentAnswers(p._id);
        const instructorAns = await answersClient.getInstructorAnswers(p._id);
        
        return {
          id: p._id,
          title: p.title,
          author: p.author,
          authorRole: p.authorRole,
          content: p.content,
          createdAt: new Date(p.createdAt),
          type: p.type,
          views: p.views,
          folder: p.folder,
          users: p.users,
          to: p.to,
          studentAnswers: studentAns.map(a => a._id), // Map to IDs only
          instructorAnswers: instructorAns.map(a => a._id), // Map to IDs only
          readByUserIds: p.readByUserIds
        };
      }));
      
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  loadPosts();
}, [courseId]);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  // Save open categories to localStorage
  useEffect(() => {
    localStorage.setItem('openCategories', JSON.stringify(Array.from(openCategories)));
  }, [openCategories]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const s = new Set(prev);
      s.has(category) ? s.delete(category) : s.add(category);
      return s;
    });
  };
useEffect(() => {
    const loadEnrollmentCount = async () => {
      if (!courseId) return;
      try {
        const count = await enrollmentsClient.getEnrollmentCount(courseId);
        setEnrollmentCount(count);
      } catch (error) {
        console.error('Error loading enrollment count:', error);
      }
    };
    loadEnrollmentCount();
  }, [courseId]);

  const handlePostClick = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowNewPostForm(false);
    }
  };

  const handleNewPostClick = () => {
    setShowNewPostForm(true);
    setSelectedPost(null);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowNewPostForm(false);
    setSelectedPost(newPost);
  };

  // --- Filter and group posts ---
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const category = categorizePost(post.createdAt, new Date());
    (acc[category] = acc[category] || []).push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const order = ["Today", "Yesterday", "Last Week"];
  const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return b.localeCompare(a);
  });
  const reloadPosts = async () => {
    if (!courseId) return;
    
    try {
      const data = await postsClient.getPostsForCourse(courseId);
      
      const transformedPosts = await Promise.all(data.map(async (p) => {
        const studentAns = await answersClient.getStudentAnswers(p._id);
        const instructorAns = await answersClient.getInstructorAnswers(p._id);
        
        return {
          id: p._id,
          title: p.title,
          author: p.author,
          authorRole: p.authorRole,
          content: p.content,
          createdAt: new Date(p.createdAt),
          type: p.type,
          views: p.views,
          folder: p.folder,
          users: p.users,
          to: p.to,
          studentAnswers: studentAns.map(a => a._id),
          instructorAnswers: instructorAns.map(a => a._id),
          readByUserIds: p.readByUserIds
        };
      }));
      
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error reloading posts:', error);
    }
  };


  return (
    <div className="d-flex h-100 bg-light">
      {/* SIDEBAR */}
      <div
        className="bg-white border-start"
        style={{
          width: isOpen ? "380px" : "40px",
          overflow: "hidden",
          transition: "width 0.3s ease",
        }}
      >
        {isOpen ? (
          <div className="h-100 d-flex flex-column">
            {/* Header */}
            <div className="p-3 border-bottom d-flex align-items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-light p-1"
              >
                <FiChevronRight size={20} className="text-secondary" />
              </button>
              <h2 className="m-0 fw-semibold text-dark">Posts</h2>
            </div>

            {/* New Post + Search */}
            <div className="p-3 border-bottom">
              <div className="mb-2">
                <NewPostButton onClick={handleNewPostClick} />
              </div>
              <SearchPostsField
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            {/* List of posts */}
            <div className="flex-grow-1 overflow-auto">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                sortedCategories.map((category) => (
                  <CategoryAccordion
                    key={category}
                    title={category}
                    posts={groupedPosts[category]}
                    isOpen={openCategories.has(category)}
                    onToggle={() => toggleCategory(category)}
                    onPostClick={handlePostClick}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-100 h-100 btn btn-light d-flex align-items-center justify-content-center"
          >
            <FiChevronRight size={20} className="text-secondary" />
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-4 overflow-auto">
        {showNewPostForm ? (
          <NewPostForm
  courseId={courseId}
  onCancel={() => setShowNewPostForm(false)}
  onPostCreated={handlePostCreated}
/>
        ) : selectedPost ? (
          <PostScreen
    post={selectedPost}
    currentUserRole={currentUser?.role === 'FACULTY' ? 'instructor' : 'student'}
    currentUserName={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User'}
    onPostUpdated={reloadPosts} // Add this prop
  />
        ) : (
          <>
            <ClassAtGlance 
  posts={posts} 
  studentsEnrolled={enrollmentCount} 
  currentUserId={currentUser?._id || ''}
/>
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfPostsSidebar;
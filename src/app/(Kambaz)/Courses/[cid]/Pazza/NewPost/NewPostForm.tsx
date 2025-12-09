'use client';
 
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import * as postsClient from '../client/posts'; // Add this import
 
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaQuoteRight,
  FaHeading,
  FaChevronLeft
} from 'react-icons/fa';
import { Post } from '../ListOfPostsSidebar/PostItem';
 
interface NewPostFormProps {
  courseId: string; // Add courseId prop
  onCancel?: () => void;
  onPostCreated?: (post: Post) => void;
}
 
const FormRow = ({ label, children, required = false, alignTop = false }: { label: string, children: React.ReactNode, required?: boolean, alignTop?: boolean }) => (
  <div className={`d-flex mb-4 ${alignTop ? 'align-items-start' : 'align-items-center'}`}>
    <div className="flex-shrink-0" style={{ width: 140, paddingTop: alignTop ? 8 : 0 }}>
      <span className="fw-bold text-secondary" style={{ fontSize: '14px' }}>{label}</span>
      {required && <span className="text-danger ms-1">*</span>}
    </div>
    <div className="flex-grow-1">{children}</div>
  </div>
);
 
export default function NewPostForm({ courseId, onCancel, onPostCreated }: NewPostFormProps) {
  const [postType, setPostType] = useState<'question' | 'note' | 'poll'>('question');
  const [postTo, setPostTo] = useState<'Entire Class' | 'Individual Students/Instructors'>('Entire Class');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const allFolders = ['hw1', 'hw2', 'project', 'logistics', 'exam_prep', 'other'];
  const [selectedFolders, setSelectedFolders] = useState<string[]>([allFolders[0]]);
  
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
 
  const users = ['Instructors', 'Alice Student', 'Bob Student', 'Charlie TA'];
 
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: details,
    onUpdate: ({ editor }) => setDetails(editor.getHTML()),
    editorProps: {
      attributes: {
        style: 'min-height: 250px; padding: 12px; outline: none; color: #333;',
      },
    },
    immediatelyRender: false,
  });
  
  useEffect(() => {
    if (editor && details !== editor.getHTML()) {
      editor.commands.setContent(details, { emitUpdate: false });
    }
  }, [details, editor]);
 
  const toggleUser = (u: string) => {
    setSelectedUsers((s) => (s.includes(u) ? s.filter((x) => x !== u) : [...s, u]));
  };
 
  const toggleFolder = (f: string) => {
    setSelectedFolders((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
  };
 
  const validate = () => {
    const e: Record<string, string> = {};
    if (!summary.trim()) e.summary = 'Summary is required.';
    else if (summary.length > 100) e.summary = 'Summary must be 100 characters or less.';
 
    const plainText = details.replace(/<[^>]+>/g, '').trim();
    if (!plainText) e.details = 'Details are required.';
 
    if (!selectedFolders || selectedFolders.length === 0) e.folders = 'Select at least one folder.';
    if (postTo === 'Individual Students/Instructors' && selectedUsers.length === 0)
      e.users = 'Select at least one user.';
 
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const handlePost = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create post via API
      const createdPost = await postsClient.createPost(courseId, {
        title: summary,
        content: details,
        type: postType,
        folder: selectedFolders,
        to: postTo,
        users: selectedUsers,
      });
      
      // Transform API response to match Post interface
      const newPost: Post = {
        id: createdPost._id,
        title: createdPost.title,
        author: createdPost.author,
        authorRole: createdPost.authorRole,
        content: createdPost.content,
        createdAt: new Date(createdPost.createdAt),
        type: createdPost.type,
        views: createdPost.views,
        folder: createdPost.folder,
        users: createdPost.users,
        to: createdPost.to,
        studentAnswers: [],
        instructorAnswers: [],
        readByUserIds: createdPost.readByUserIds
      };
      
      // Clear form
      setSummary('');
      setDetails('');
      setSelectedFolders([allFolders[0]]);
      setSelectedUsers([]);
      setErrors({});
      editor?.commands.clearContent();
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleBack = () => {
    if (onCancel) {
        onCancel();
    } else {
        console.log("Back button clicked - pass an onCancel prop to handle routing");
    }
  }
 
  return (
    <div className="container" style={{ maxWidth: 960, fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* HEADER WITH BACK BUTTON */}
      <div className="d-flex align-items-center border-bottom border-primary border-2 pb-2 mb-4 mt-3">
        <button
            onClick={handleBack}
            className="btn btn-link text-primary text-decoration-none d-flex align-items-center fw-semibold p-0 pe-3 me-3 border-end"
            style={{ fontSize: 16 }}
        >
            <FaChevronLeft className="me-1" style={{ fontSize: 14 }} />
            Back
        </button>
 
        <h2 className="m-0 text-dark" style={{ fontSize: 24 }}>New Post</h2>
      </div>
 
      <div>
        
        {/* Post Type */}
        <FormRow label="Post Type" required>
          <div className="d-flex gap-2">
            {(['question', 'note', 'poll'] as const).map((t) => {
              const isActive = postType === t;
              return (
                <button
                  key={t}
                  onClick={() => setPostType(t)}
                  className={`btn fw-semibold px-4 py-2 ${
                    isActive
                      ? 'btn-primary shadow-sm'
                      : 'btn-outline-secondary'
                  }`}
                  style={{
                    transition: 'all 0.2s'
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </FormRow>
 
        {/* Post To */}
        <FormRow label="Post to" required alignTop>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="entireClass"
                checked={postTo === 'Entire Class'}
                onChange={() => setPostTo('Entire Class')}
              />
              <label className="form-check-label" htmlFor="entireClass" style={{ cursor: 'pointer' }}>
                Entire Class
              </label>
            </div>
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="individual"
                checked={postTo === 'Individual Students/Instructors'}
                onChange={() => setPostTo('Individual Students/Instructors')}
              />
              <label className="form-check-label" htmlFor="individual" style={{ cursor: 'pointer' }}>
                Individual Students / Instructors
              </label>
            </div>
 
            {postTo === 'Individual Students/Instructors' && (
              <div className="mt-2 p-3 bg-light border rounded">
                <div className="text-muted fw-bold mb-2" style={{ fontSize: 12 }}>SELECT RECIPIENTS:</div>
                <div className="d-flex flex-wrap gap-2">
                  {users.map(u => (
                    <button
                      key={u}
                      onClick={() => toggleUser(u)}
                      className={`btn btn-sm ${
                        selectedUsers.includes(u)
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                      style={{ fontSize: 12 }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                {errors.users && <div className="text-danger mt-1" style={{ fontSize: 12 }}>{errors.users}</div>}
              </div>
            )}
          </div>
        </FormRow>
 
        {/* Folders */}
        <FormRow label="Select Folder(s)" required alignTop>
           <div className="bg-light border rounded p-3">
             <div className="d-flex flex-wrap gap-2">
              {allFolders.map(f => {
                const isSelected = selectedFolders.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFolder(f)}
                    className={`btn btn-sm fw-semibold ${
                      isSelected
                        ? 'btn-primary btn-outline-primary'
                        : 'btn-light'
                    }`}
                    style={{
                      borderRadius: 12,
                      fontSize: 12,
                      backgroundColor: isSelected ? '#dcebf7' : '#eee',
                      color: isSelected ? '#2c5e88' : '#555',
                      borderColor: isSelected ? '#9dc0db' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    {f}
                  </button>
                )
              })}
             </div>
             {errors.folders && <div className="text-danger mt-2" style={{ fontSize: 12 }}>{errors.folders}</div>}
           </div>
        </FormRow>
 
        {/* Summary */}
        <FormRow label="Summary" required>
          <div>
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
              className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
              placeholder="Enter a one-line summary..."
            />
            {errors.summary && <div className="invalid-feedback d-block">{errors.summary}</div>}
          </div>
        </FormRow>
 
        {/* Details (Editor) */}
        <FormRow label="Details" alignTop>
          <div className={`border rounded ${errors.details ? 'border-danger' : ''}`}>
            {/* Toolbar */}
            <div className="d-flex flex-wrap gap-1 p-2 bg-light border-bottom">
              {[
                { icon: FaBold, action: () => editor?.chain().focus().toggleBold().run(), active: 'bold', title: 'Bold' },
                { icon: FaItalic, action: () => editor?.chain().focus().toggleItalic().run(), active: 'italic', title: 'Italic' },
                { icon: FaUnderline, action: () => editor?.chain().focus().toggleUnderline().run(), active: 'underline', title: 'Underline' },
                { separator: true },
                { icon: FaListUl, action: () => editor?.chain().focus().toggleBulletList().run(), active: 'bulletList', title: 'Bullet List' },
                { icon: FaListOl, action: () => editor?.chain().focus().toggleOrderedList().run(), active: 'orderedList', title: 'Ordered List' },
                { separator: true },
                { icon: FaHeading, action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(), active: 'heading', level: 1, label: 'H1' },
                { icon: FaHeading, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading', level: 2, label: 'H2' },
                { icon: FaQuoteRight, action: () => editor?.chain().focus().toggleBlockquote().run(), active: 'blockquote', title: 'Quote' },
                { icon: FaLink, action: () => {
                    const url = prompt('Enter URL');
                    if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }, active: 'link', title: 'Link' },
              ].map((btn, i) => {
                if (btn.separator) return <div key={i} className="border-start mx-1" />;
                
                const Icon = btn.icon!;
                const active = btn.level
                  ? editor?.isActive(btn.active!, { level: btn.level })
                  : editor?.isActive(btn.active!);
                  
                return (
                  <button
                    key={i}
                    onClick={btn.action}
                    title={btn.title}
                    type="button"
                    className={`btn btn-sm d-flex align-items-center justify-content-center ${
                      active ? 'btn-light active' : 'btn-link text-secondary'
                    }`}
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      border: active ? '1px solid #dee2e6' : '1px solid transparent',
                      backgroundColor: active ? '#d1e3f3' : 'transparent'
                    }}
                  >
                    <Icon size={12} />
                    {btn.label && <span className="fw-bold ms-1" style={{ fontSize: 9 }}>{btn.label}</span>}
                  </button>
                );
              })}
            </div>
 
            <EditorContent editor={editor} style={{ minHeight: 250 }} />
          </div>
          {errors.details && <div className="text-danger mt-1" style={{ fontSize: 12 }}>{errors.details}</div>}
        </FormRow>
 
        {/* Action Bar */}
        <div className="mt-4 pt-3 border-top d-flex gap-3">
          <button
            onClick={handlePost}
            disabled={isSubmitting}
            className="btn btn-primary fw-bold shadow-sm"
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Posting...
              </>
            ) : (
              `Post My ${postType === 'note' ? 'Note' : 'Question'}`
            )}
          </button>
          
          <button
            onClick={handleBack}
            disabled={isSubmitting}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        </div>
 
      </div>
    </div>
  );
}
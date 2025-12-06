'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaQuoteRight,
  FaHeading,
  FaChevronLeft // Added this
} from 'react-icons/fa';

// --- Types ---
type Post = {
  id: number;
  type: 'Question' | 'Note' | 'Poll';
  to: 'Entire Class' | 'Individual Students/Instructors';
  users: string[];
  folders: string[];
  summary: string;
  details: string;
};

// Add props to handle navigation
interface NewPostFormProps {
  onCancel?: () => void;
  onPostCreated?: (post: Post) => void;
}

// --- Styles (Piazza-like theme) ---
const theme = {
  blue: '#3777ac',
  lightBlue: '#eef4fa',
  border: '#dcdcdc',
  label: '#444',
  text: '#333',
  bg: '#fff',
  error: '#c0392b',
};

const FormRow = ({ label, children, required = false, alignTop = false }: { label: string, children: React.ReactNode, required?: boolean, alignTop?: boolean }) => (
  <div style={{ display: 'flex', marginBottom: 20, alignItems: alignTop ? 'flex-start' : 'center' }}>
    <div style={{ width: 140, flexShrink: 0, paddingTop: alignTop ? 8 : 0 }}>
      <span style={{ fontWeight: 700, color: theme.label, fontSize: '14px' }}>{label}</span>
      {required && <span style={{ color: theme.error, marginLeft: 4 }}>*</span>}
    </div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export default function NewPostForm({ onCancel, onPostCreated }: NewPostFormProps) {
  const [postType, setPostType] = useState<Post['type']>('Question');
  const [postTo, setPostTo] = useState<Post['to']>('Entire Class');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const allFolders = ['hw1', 'hw2', 'project', 'logistics', 'exam_prep', 'other'];
  const [selectedFolders, setSelectedFolders] = useState<string[]>([allFolders[0]]);
  
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [details, setDetails] = useState('');

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

  const handlePost = () => {
    if (!validate()) return;
    const newPost: Post = {
      id: Date.now(),
      type: postType,
      to: postTo,
      users: selectedUsers,
      folders: selectedFolders,
      summary,
      details,
    };
    
    // Clear and Notify
    setSummary('');
    setDetails('');
    setSelectedFolders([allFolders[0]]);
    setSelectedUsers([]);
    setErrors({});
    editor?.commands.clearContent();
    
    if (onPostCreated) {
        onPostCreated(newPost);
    } else {
        alert("Post created! (Check console for object)");
        console.log(newPost);
    }
  };

  // Default back handler if none provided
  const handleBack = () => {
    if (onCancel) {
        onCancel();
    } else {
        console.log("Back button clicked - pass an onCancel prop to handle routing");
        // alert("Back clicked"); 
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: '20px auto', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* --- HEADER WITH BACK BUTTON --- */}
      <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          borderBottom: `2px solid ${theme.blue}`, 
          paddingBottom: 10, 
          marginBottom: 24 
      }}>
        {/* Back Button */}
        <button 
            onClick={handleBack}
            style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                color: theme.blue, 
                fontSize: 16, 
                fontWeight: 600,
                padding: '0 12px 0 0',
                marginRight: 12,
                borderRight: '1px solid #ccc' // Optional visual separator
            }}
        >
            <FaChevronLeft style={{ marginRight: 4, fontSize: 14 }} />
            Back
        </button>

        {/* Title */}
        <h2 style={{ margin: 0, color: theme.text, fontSize: 24 }}>New Post</h2>
      </div>

      <div style={{ background: '#fff' }}>
        
        {/* Post Type */}
        <FormRow label="Post Type" required>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Question', 'Note', 'Poll'].map((t) => {
              const isActive = postType === t;
              return (
                <button
                  key={t}
                  onClick={() => setPostType(t as Post['type'])}
                  style={{
                    padding: '8px 24px',
                    border: `1px solid ${isActive ? theme.blue : theme.border}`,
                    background: isActive ? theme.blue : '#f9f9f9',
                    color: isActive ? '#fff' : '#555',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                checked={postTo === 'Entire Class'}
                onChange={() => setPostTo('Entire Class')}
                style={{ marginRight: 8, accentColor: theme.blue }}
              />
              Entire Class
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                checked={postTo === 'Individual Students/Instructors'}
                onChange={() => setPostTo('Individual Students/Instructors')}
                style={{ marginRight: 8, accentColor: theme.blue }}
              />
              Individual Students / Instructors
            </label>

            {postTo === 'Individual Students/Instructors' && (
              <div style={{ marginTop: 8, padding: 12, background: '#f5f5f5', borderRadius: 4, border: '1px solid #ddd' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#666' }}>SELECT RECIPIENTS:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {users.map(u => (
                    <button
                      key={u}
                      onClick={() => toggleUser(u)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 12,
                        background: selectedUsers.includes(u) ? theme.blue : '#fff',
                        color: selectedUsers.includes(u) ? '#fff' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        cursor: 'pointer'
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                {errors.users && <div style={{ color: theme.error, fontSize: 12, marginTop: 4 }}>{errors.users}</div>}
              </div>
            )}
          </div>
        </FormRow>

        {/* Folders */}
        <FormRow label="Select Folder(s)" required alignTop>
           <div style={{ background: '#fcfcfc', border: `1px solid ${theme.border}`, padding: 12, borderRadius: 4 }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allFolders.map(f => {
                const isSelected = selectedFolders.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFolder(f)}
                    style={{
                      background: isSelected ? '#dcebf7' : '#eee',
                      color: isSelected ? '#2c5e88' : '#555',
                      border: isSelected ? '1px solid #9dc0db' : '1px solid transparent',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    {f}
                  </button>
                )
              })}
             </div>
             {errors.folders && <div style={{ color: theme.error, fontSize: 12, marginTop: 6 }}>{errors.folders}</div>}
           </div>
        </FormRow>

        {/* Summary */}
        <FormRow label="Summary" required>
          <div>
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
              style={{
                width: '100%',
                padding: '8px 10px',
                border: errors.summary ? `1px solid ${theme.error}` : `1px solid ${theme.border}`,
                borderRadius: 3,
                fontSize: 14,
                boxSizing: 'border-box'
              }}
              placeholder="Enter a one-line summary..."
            />
            {errors.summary && <div style={{ color: theme.error, fontSize: 12, marginTop: 4 }}>{errors.summary}</div>}
          </div>
        </FormRow>

        {/* Details (Editor) */}
        <FormRow label="Details" alignTop>
          <div style={{ border: errors.details ? `1px solid ${theme.error}` : `1px solid ${theme.border}`, borderRadius: 4, background: '#fff' }}>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              gap: 2,
              padding: 6,
              background: '#f1f1f1',
              borderBottom: '1px solid #ddd',
              borderRadius: '4px 4px 0 0',
              flexWrap: 'wrap'
            }}>
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
                if (btn.separator) return <div key={i} style={{ width: 1, background: '#ccc', margin: '0 4px' }} />;
                
                const Icon = btn.icon!;
                const active = btn.level
                  ? editor?.isActive(btn.active!, { level: btn.level })
                  : editor?.isActive(btn.active!);
                  
                return (
                  <button
                    key={i}
                    onClick={btn.action}
                    title={btn.title}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 30, height: 30,
                      border: '1px solid transparent',
                      background: active ? '#d1e3f3' : 'transparent',
                      color: active ? '#333' : '#555',
                      borderRadius: 2,
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={12} />
                    {btn.label && <span style={{ fontSize: 9, marginLeft: 2, fontWeight: 700 }}>{btn.label}</span>}
                  </button>
                );
              })}
            </div>

            <EditorContent editor={editor} style={{ minHeight: 250 }} />
          </div>
          {errors.details && <div style={{ color: theme.error, fontSize: 12, marginTop: 4 }}>{errors.details}</div>}
        </FormRow>

        {/* Action Bar */}
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #eee', display: 'flex', gap: 12 }}>
          <button
            onClick={handlePost}
            style={{
              padding: '10px 24px',
              background: theme.blue,
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Post My {postType === 'Note' ? 'Note' : 'Question'}
          </button>
          
          <button
            onClick={handleBack}
            style={{
              padding: '10px 24px',
              background: '#fff',
              color: '#666',
              border: '1px solid #ccc',
              borderRadius: 4,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
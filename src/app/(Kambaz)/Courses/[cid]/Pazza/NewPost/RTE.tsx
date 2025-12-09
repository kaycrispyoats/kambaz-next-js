'use client';
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
 
type RTEProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};
 
export default function RTE({ value, onChange, placeholder }: RTEProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: 'height: 100%; overflow-y: auto; padding: 4px;',
      },
    },
    immediatelyRender: false,
  });
 
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);
 
  if (!editor) return null;
 
  return (
    <div className="d-flex flex-column border rounded" style={{ height: 300 }}>
      {/* Toolbar */}
      <div className="border-bottom p-1 d-flex gap-1">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &quot;
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            const url = prompt('Enter URL');
            if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
        >
          Link
        </button>
      </div>
 
      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="flex-grow-1 p-2 overflow-auto"
      />
    </div>
  );
}
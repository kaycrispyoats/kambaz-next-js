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
    <div style={{ display: 'flex', flexDirection: 'column', height: 300, border: '1px solid #ccc', borderRadius: 4 }}>
      {/* Toolbar */}
      <div style={{ borderBottom: '1px solid #ddd', padding: 4, display: 'flex', gap: 4 }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          U
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        </button>
        <button
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
        style={{ flexGrow: 1, padding: 8, overflowY: 'auto' }}
      />
    </div>
  );
}

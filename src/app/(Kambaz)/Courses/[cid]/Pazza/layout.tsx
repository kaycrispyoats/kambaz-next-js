// This file assumes your Sidebar component is located at a path
// relative to this layout file, for example:
// '../../../../../components/Sidebar'
// You MUST adjust the import path below to match your project structure.

import Sidebar from './Sidebar'; 
import React from 'react';
import "../../../styles.css";
/**
 * CourseLayout Component
 * This layout wraps all pages within the '/pazza/' route segment.
 * The Sidebar (navigation) persists across page navigations.
 */
export default function CourseLayout({
  children, // This prop represents the actual page content (Q&A, Resources, etc.)
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* 1. The sticky navigation bar is rendered here. 
          Because it is outside the 'children' prop, it persists. */}
     
      
      {/* 2. The main content of the page is rendered here. 
          This is the part that changes when you navigate. */}
      <main className="wd-course-main-content">
        {children}
      </main>
    </div>
  );
}
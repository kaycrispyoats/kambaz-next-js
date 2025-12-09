'use client';
import React from 'react';
 
type UserSelectorProps = {
  allUsers: string[]; // first item expected to be "Instructors"
  selected: string[];
  onToggle: (user: string) => void;
};
 
export default function UserSelector({ allUsers, selected, onToggle }: UserSelectorProps) {
  return (
    <div className="border rounded p-2">
      <div className="mb-2" style={{ fontSize: 13 }}>Select users who can see this post</div>
      {allUsers.map((u) => (
        <div key={u} className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id={`user-${u}`}
            checked={selected.includes(u)}
            onChange={() => onToggle(u)}
          />
          <label className="form-check-label" htmlFor={`user-${u}`} style={{ cursor: 'pointer' }}>
            {u}
          </label>
        </div>
      ))}
    </div>
  );
}
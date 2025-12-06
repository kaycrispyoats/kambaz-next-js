'use client';
import React from 'react';

type UserSelectorProps = {
  allUsers: string[]; // first item expected to be "Instructors"
  selected: string[];
  onToggle: (user: string) => void;
};

export default function UserSelector({ allUsers, selected, onToggle }: UserSelectorProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 8, borderRadius: 4 }}>
      <div style={{ fontSize: 13, marginBottom: 6 }}>Select users who can see this post</div>
      {allUsers.map((u) => (
        <label key={u} style={{ display: 'block', marginBottom: 6, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={selected.includes(u)}
            onChange={() => onToggle(u)}
            style={{ marginRight: 8 }}
          />
          {u}
        </label>
      ))}
    </div>
  );
}
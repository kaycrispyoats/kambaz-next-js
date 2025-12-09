'use client';
import React from 'react';
 
type FolderSelectorProps = {
  folders: string[]; // available folders
  selected: string[]; // selected folder names
  onToggle: (folder: string) => void;
};
 
export default function FolderSelector({ folders, selected, onToggle }: FolderSelectorProps) {
  return (
    <div>
      <div className="fw-semibold mb-2">Select Folders</div>
      <div className="d-flex gap-2 flex-wrap">
        {folders.map((f) => {
          const active = selected.includes(f);
          return (
            <label
              key={f}
              className={`border rounded px-2 py-1 cursor-pointer d-flex align-items-center gap-2 ${
                active ? 'bg-primary bg-opacity-10 border-primary' : 'bg-white'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(f)}
                className="m-0 form-check-input"
              />
              <span>{f}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
 
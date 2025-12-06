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
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Select Folders</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {folders.map((f) => {
          const active = selected.includes(f);
          return (
            <label
              key={f}
              style={{
                border: '1px solid #ccc',
                padding: '6px 10px',
                borderRadius: 4,
                cursor: 'pointer',
                background: active ? '#eef' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(f)}
                style={{ margin: 0 }}
              />
              <span>{f}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function ActionDropdown({ 
  onEdit, 
  onDelete,
  isAuthorOrInstructor 
}: { 
  onEdit: () => void; 
  onDelete: () => void;
  isAuthorOrInstructor: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthorOrInstructor) return null;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-light btn-sm p-1"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical size={16} />
      </button>

      {isOpen && (
        <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button
              className="dropdown-item text-danger"
              type="button"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

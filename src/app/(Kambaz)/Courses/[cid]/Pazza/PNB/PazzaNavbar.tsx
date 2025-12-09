import { useState, useEffect } from 'react';
import { profile } from '../../../../Account/client'; // Adjust path as needed

type PiazzaNavBarProps = {
  courseName: string;
  activeTab: 'Q&A' | 'Manage Class';
  onTabChange: (tab: 'Q&A' | 'Manage Class') => void;
  userRole?: string; // Add user role prop
};

export default function PiazzaNavBar({ courseName, activeTab, onTabChange, userRole }: PiazzaNavBarProps) {
  const [currentUser, setCurrentUser] = useState<string>('Loading...');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await profile();
        // Assuming user object has firstName and lastName properties
        const displayName = user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}`
          : user.username || 'User';
        setCurrentUser(displayName);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.warn('Not logged in');
          setCurrentUser('Guest');
        } else {
          console.error('Error fetching user:', err);
          setCurrentUser('User');
        }
      }
    };
    fetchUser();
  }, []);

  // Only show Manage Class tab for FACULTY
  const isFaculty = userRole === 'FACULTY';

  return (
    <nav className="navbar navbar-expand" style={{ backgroundColor: '#4a7c9e' }}>
      <div className="container-fluid px-4">
        {/* Application Logo */}
        <a className="navbar-brand text-white fw-bold" href="" style={{ fontSize: 24 }}>
          pazza
        </a>

        {/* Course Name */}
        <span className="text-white fw-semibold mx-4" style={{ fontSize: 16 }}>
          {courseName}
        </span>

        {/* Navigation Tabs */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <button
              className={`nav-link text-white ${activeTab === 'Q&A' ? 'fw-bold border-bottom border-white border-2' : ''}`}
              onClick={() => onTabChange('Q&A')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Q & A
            </button>
          </li>
          {isFaculty && (
            <li className="nav-item">
              <button
                className={`nav-link text-white ${activeTab === 'Manage Class' ? 'fw-bold border-bottom border-white border-2' : ''}`}
                onClick={() => onTabChange('Manage Class')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Manage Class
              </button>
            </li>
          )}
        </ul>

        {/* Current User */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-white rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold"
            style={{ width: 32, height: 32, fontSize: 14 }}
          >
            {currentUser.charAt(0).toUpperCase()}
          </div>
          <span className="text-white">{currentUser}</span>
        </div>
      </div>
    </nav>
  );
}
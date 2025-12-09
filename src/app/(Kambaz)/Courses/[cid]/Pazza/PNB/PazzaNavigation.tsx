import PazzaNavBar from './PazzaNavbar';
import FolderFilters from './FolderFilter';

type PiazzaNavigationProps = {
  courseName: string;
  currentUser: string;
  folders: string[];
  activeTab: 'Q&A' | 'Manage Class';
  selectedFolder: string;
  onTabChange: (tab: 'Q&A' | 'Manage Class') => void;
  onFolderChange: (folder: string) => void;
  userRole?: string; // Add this
};

export default function PiazzaNavigation({
  courseName,
  currentUser,
  folders,
  activeTab,
  selectedFolder,
  onTabChange,
  onFolderChange,
  userRole // Add this
}: PiazzaNavigationProps) {
  return (
    <div>
      <PazzaNavBar
        courseName={courseName}
        activeTab={activeTab}
        onTabChange={onTabChange}
        userRole={userRole} // Pass it here
      />
      <FolderFilters
        folders={folders}
        selectedFolder={selectedFolder}
        onFolderChange={onFolderChange}
      />
    </div>
  );
}
type FolderFiltersProps = {
  folders: string[];
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
};
 
export default function FolderFilters({ folders, selectedFolder, onFolderChange }: FolderFiltersProps) {
  return (
    <div className="bg-light border-bottom py-2 px-4">
      <div className="d-flex gap-3 align-items-center flex-wrap">
        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => onFolderChange(folder)}
            className={`btn btn-sm ${
              selectedFolder === folder
                ? 'btn-primary fw-semibold'
                : 'btn-outline-secondary'
            }`}
            style={{ fontSize: 14 }}
          >
            {folder}
          </button>
        ))}
      </div>
    </div>
  );
}
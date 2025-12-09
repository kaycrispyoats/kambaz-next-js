import { FaPlus } from "react-icons/fa6";
export default function NewPostButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
    >
      <FaPlus className="w-5 h-5" />
      <span>New Post</span>
    </button>
  );
}
import { FaSearch } from "react-icons/fa";

export default function SearchPostsField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="position-relative w-100">
      <FaSearch
        className="position-absolute"
        style={{
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#6c757d", // Bootstrap gray-600
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search or add a post..."
        className="form-control ps-5"
      />
    </div>
  );
}
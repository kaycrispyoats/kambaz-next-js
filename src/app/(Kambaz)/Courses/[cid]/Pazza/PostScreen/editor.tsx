export default function editor({
  value,
  onChange,
  onSubmit,
  onCancel,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  placeholder?: string;
}) {
  return (
    <div className="border rounded">
      {/* Toolbar */}
      <div className="bg-light border-bottom p-2 d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary btn-sm fw-bold">B</button>
        <button type="button" className="btn btn-outline-secondary btn-sm fst-italic">I</button>
        <button type="button" className="btn btn-outline-secondary btn-sm">Link</button>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control p-2"
        style={{ minHeight: "120px", resize: "none" }}
      />

      {/* Action Buttons */}
      <div className="bg-light border-top p-2 d-flex gap-2">
        <button
          type="button"
          onClick={onSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
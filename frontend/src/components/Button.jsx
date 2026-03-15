export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-pink font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

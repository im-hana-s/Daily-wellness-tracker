export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-pink-600 font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-pink w-full"
      />
    </div>
  );
}

// Input.tsx for a reusable input component in React with TypeScript
// Flora Öhrman

import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "number" | "date" | "time";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
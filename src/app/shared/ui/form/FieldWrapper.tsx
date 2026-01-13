// FieldWrapper.tsx

import ErrorMessage from "./ErrorMessage";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function FieldWrapper({
  label,
  required,
  error,
  children
}: FieldWrapperProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-gray-400 text-xs">(opcional)</span>
        )}
      </label>

      {children}

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

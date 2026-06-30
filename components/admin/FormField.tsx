type FormFieldProps = {
  label: string;
  name: string;
  error?: string[];
  hint?: string;
  isRequired?: boolean;
  children: React.ReactNode;
};

/**
 * Wrapper komponen form field dengan label, error message, dan hint.
 * Menyediakan layout konsisten untuk semua input di admin form.
 */
export function FormField({
  label,
  name,
  error,
  hint,
  isRequired = false,
  children,
}: FormFieldProps) {
  const hasError = error && error.length > 0;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-navy dark:text-white"
      >
        {label}
        {isRequired && <span className="ml-1 text-rose-DEFAULT">*</span>}
      </label>

      {children}

      {hint && !hasError && (
        <p className="text-xs text-text-muted dark:text-white/40">{hint}</p>
      )}

      {hasError && (
        <div className="space-y-0.5">
          {error.map((msg) => (
            <p key={msg} className="text-xs font-medium text-rose-DEFAULT">
              {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";

/* ──────────────────────────
   ► Tiny utility
────────────────────────── */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ──────────────────────────
   ► Minimal Button
────────────────────────── */
const Button = ({ children, variant = "solid", size = "md", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none";
  const variants = {
    solid: "bg-violet-500 hover:bg-violet-600 text-white",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
  };
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size])}
      {...props}
    >
      {children}
    </button>
  );
};

/* ──────────────────────────
   ► Minimal Select
────────────────────────── */
const Select = ({ value, onChange, options, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={cn(
      "border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:border-gray-700",
      className
    )}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

/* ──────────────────────────
   ► TeamMembersTable
────────────────────────── */
export const TeamMembersTable = ({
  members,
  onRoleChange,
  onRemoveMember,
}) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        {["Email", "Name", "Role", "Actions"].map((h) => (
          <div
            key={h}
            className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400 border-r last:border-r-0 border-gray-300 dark:border-gray-700"
          >
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {members.map((m, idx) => (
        <div
          key={m.id}
          className={cn(
            "grid grid-cols-4",
            idx !== members.length - 1 && "border-b border-gray-300 dark:border-gray-700"
          )}
        >
          <div className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
            {m.email}
          </div>
          <div className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
            {m.name}
          </div>

          {/* Role column */}
          <div className="px-6 py-4 text-sm border-r border-gray-300 dark:border-gray-700">
            {m.role === "Owner" ? (
              <span className="text-gray-900 dark:text-gray-200">{m.role}</span>
            ) : (
              <Select
                value={m.role}
                onChange={(val) => onRoleChange(m.id, val)}
                options={["Editor", "Viewer"]}
                className="w-24"
              />
            )}
          </div>

          {/* Actions column */}
          <div className="px-6 py-4 text-sm space-x-2">
            {m.role !== "Owner" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onRoleChange(m.id, m.role === "Editor" ? "Viewer" : "Editor")
                  }
                >
                  Change Role
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMember(m.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
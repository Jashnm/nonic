import * as React from "react";

export type ToolbarButtonProps = {
  onClick: () => void;
  className?: string;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  onClick,
  className
}) => {
  return (
    <button
      type="button"
      className={`btn btn-outline border-neutral ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

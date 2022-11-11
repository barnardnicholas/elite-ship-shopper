import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  inline?: boolean;
  disabled?: boolean;
}
function Button({ onClick, children, inline, disabled = false }: ButtonProps) {
  return (
    <div className={`button-wrapper ${inline ? 'inline' : ''}`}>
      <button
        type="button"
        className={`button ${disabled ? 'disabled' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;

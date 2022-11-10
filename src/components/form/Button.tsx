import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  inline?: boolean;
}
function Button({ onClick, children, inline }: ButtonProps) {
  return (
    <div className={`button-wrapper ${inline ? 'inline' : ''}`}>
      <button type="button" className="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
